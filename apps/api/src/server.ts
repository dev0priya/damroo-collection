import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import bcrypt from "bcryptjs";
import { config as loadEnv } from "dotenv";
import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import fs from "node:fs";
import jwt from "jsonwebtoken";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import Razorpay from "razorpay";
import { z } from "zod";
import { getServerEnv } from "@damroo/config";
import { prisma, type Role } from "@damroo/db";
import {
  adminCategorySchema,
  adminHeroBannerSchema,
  adminPageSchema,
  adminProductSchema,
  adminSiteConfigSchema,
  cartItemSchema,
  checkoutSchema,
  loginSchema,
  menuItemSchema,
  orderStatusSchema,
  productQuerySchema,
  registerSchema,
  verifyPaymentSchema
} from "./schemas.js";
import { calculateOrderTotals, createOrderNumber, verifyRazorpaySignature } from "./services.js";

loadEnv({ path: path.resolve(process.cwd(), ".env") });
loadEnv({ path: path.resolve(process.cwd(), "../../.env") });

const env = getServerEnv();
const app = Fastify({ logger: true });

type SessionUser = { id: string; role: Role; email: string };

function signSession(user: SessionUser) {
  return jwt.sign(user, env.JWT_SECRET, { expiresIn: "7d" });
}

async function getSession(request: FastifyRequest) {
  const token = request.cookies[env.COOKIE_NAME];
  if (!token) return null;
  try {
    return jwt.verify(token, env.JWT_SECRET) as SessionUser;
  } catch {
    return null;
  }
}

async function requireUser(request: FastifyRequest, reply: FastifyReply) {
  const session = await getSession(request);
  if (!session) {
    reply.code(401).send({ message: "Login required" });
    return null;
  }
  return session;
}

async function requireAdmin(request: FastifyRequest, reply: FastifyReply) {
  const session = await requireUser(request, reply);
  if (!session) return null;
  if (session.role !== "ADMIN") {
    reply.code(403).send({ message: "Admin access required" });
    return null;
  }
  return session;
}

function parseBody<T>(schema: z.Schema<T>, body: unknown) {
  return schema.parse(body);
}

await app.register(cookie);
await app.register(cors, {
  credentials: true,
  origin: [env.WEB_ORIGIN, env.ADMIN_ORIGIN]
});

await app.register(fastifyMultipart);
await app.register(fastifyStatic, {
  root: path.resolve(process.cwd(), "uploads"),
  prefix: "/uploads/"
});

if (!fs.existsSync(path.resolve(process.cwd(), "uploads"))) {
  fs.mkdirSync(path.resolve(process.cwd(), "uploads"));
}

app.get("/health", async () => ({ ok: true, service: "damroo-api" }));

app.post("/auth/register", async (request, reply) => {
  const data = parseBody(registerSchema, request.body);
  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email.toLowerCase(),
      passwordHash,
      phone: data.phone,
      cart: { create: {} },
      wishlist: { create: {} }
    }
  });
  reply.setCookie(env.COOKIE_NAME, signSession({ id: user.id, role: user.role, email: user.email }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
  return { user: { id: user.id, name: user.name, email: user.email, role: user.role } };
});

app.post("/auth/login", async (request, reply) => {
  const data = parseBody(loginSchema, request.body);
  const user = await prisma.user.findUnique({ where: { email: data.email.toLowerCase() } });
  if (!user || !user.isActive || !(await bcrypt.compare(data.password, user.passwordHash))) {
    reply.code(401).send({ message: "Invalid email or password" });
    return;
  }
  reply.setCookie(env.COOKIE_NAME, signSession({ id: user.id, role: user.role, email: user.email }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
  return { user: { id: user.id, name: user.name, email: user.email, role: user.role } };
});

app.post("/auth/logout", async (_request, reply) => {
  reply.clearCookie(env.COOKIE_NAME, { path: "/" });
  return { ok: true };
});

app.get("/auth/me", async (request, reply) => {
  const session = await requireUser(request, reply);
  if (!session) return;
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { id: true, name: true, email: true, role: true, phone: true, addresses: true }
  });
  return { user };
});

app.get("/categories", async () => {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: [{ displayRank: "asc" }, { name: "asc" }],
    include: { children: true }
  });
  return { categories };
});

app.get("/hero-banners", async () => {
  const banners = await prisma.heroBanner.findMany({
    where: { isActive: true },
    orderBy: { rank: "asc" }
  });
  return { banners };
});

app.get("/site-config", async () => {
  const configs = await prisma.siteConfig.findMany();
  const configMap = configs.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
  return { config: configMap };
});

app.get("/navigation", async (request) => {
  const { position } = request.query as { position?: string };
  const items = await prisma.menuItem.findMany({
    where: position ? { position: position as any } : {},
    orderBy: { rank: "asc" },
    include: { page: { select: { slug: true } }, children: { include: { page: { select: { slug: true } } }, orderBy: { rank: "asc" } } }
  });
  return { items: items.filter(item => !item.parentId) }; // Return root items with children
});

app.get("/products", async (request) => {
  const query = productQuerySchema.parse(request.query);
  const where = {
    status: "PUBLISHED",
    ...(query.q
      ? {
          OR: [
            { name: { contains: query.q, mode: "insensitive" as const } },
            { brand: { contains: query.q, mode: "insensitive" as const } },
            { description: { contains: query.q, mode: "insensitive" as const } }
          ]
        }
      : {}),
    ...(query.category ? { category: { slug: query.category } } : {}),
    ...(query.rating ? { ratingAverage: { gte: query.rating } } : {}),
    variants: {
      some: {
        ...(query.size ? { size: query.size } : {}),
        ...(query.color ? { color: query.color } : {}),
        ...(query.minPrice || query.maxPrice
          ? { salePrice: { ...(query.minPrice ? { gte: query.minPrice } : {}), ...(query.maxPrice ? { lte: query.maxPrice } : {}) } }
          : {})
      }
    }
  };

  const orderBy =
    query.sort === "price-asc"
      ? { variants: { _count: "asc" as const } }
      : query.sort === "rating"
        ? { ratingAverage: "desc" as const }
        : { createdAt: "desc" as const };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    take: query.limit + 1,
    ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
    include: { category: true, variants: true, images: { orderBy: { rank: "asc" } } }
  });

  const nextCursor = products.length > query.limit ? products[query.limit]?.id : null;
  return { products: products.slice(0, query.limit), nextCursor };
});

app.get("/products/:slug", async (request, reply) => {
  const { slug } = request.params as { slug: string };
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
      images: { orderBy: { rank: "asc" } },
      reviews: { include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } }
    }
  });
  if (!product) {
    reply.code(404).send({ message: "Product not found" });
    return;
  }
  return { product };
});

app.get("/cart", async (request, reply) => {
  const session = await requireUser(request, reply);
  if (!session) return;
  const cart = await prisma.cart.findUnique({
    where: { userId: session.id },
    include: { items: { include: { product: { include: { images: true } }, variant: true } } }
  });
  const totals = calculateOrderTotals((cart?.items ?? []).map((item) => ({ price: item.variant.salePrice, quantity: item.quantity })));
  return { cart, totals };
});

app.post("/cart/items", async (request, reply) => {
  const session = await requireUser(request, reply);
  if (!session) return;
  const data = parseBody(cartItemSchema, request.body);
  const cart = await prisma.cart.upsert({ where: { userId: session.id }, create: { userId: session.id }, update: {} });
  const item = await prisma.cartItem.upsert({
    where: { cartId_variantId: { cartId: cart.id, variantId: data.variantId } },
    create: { cartId: cart.id, productId: data.productId, variantId: data.variantId, quantity: data.quantity },
    update: { quantity: data.quantity }
  });
  return { item };
});

app.delete("/cart/items/:id", async (request, reply) => {
  const session = await requireUser(request, reply);
  if (!session) return;
  const { id } = request.params as { id: string };
  await prisma.cartItem.delete({ where: { id } });
  return { ok: true };
});

app.get("/wishlist", async (request, reply) => {
  const session = await requireUser(request, reply);
  if (!session) return;
  const wishlist = await prisma.wishlist.upsert({ where: { userId: session.id }, create: { userId: session.id }, update: {} });
  const items = await prisma.wishlistItem.findMany({
    where: { wishlistId: wishlist.id },
    include: { product: { include: { images: true, variants: true } } }
  });
  return { items };
});

app.post("/wishlist/:productId", async (request, reply) => {
  const session = await requireUser(request, reply);
  if (!session) return;
  const { productId } = request.params as { productId: string };
  const wishlist = await prisma.wishlist.upsert({ where: { userId: session.id }, create: { userId: session.id }, update: {} });
  const item = await prisma.wishlistItem.upsert({
    where: { wishlistId_productId: { wishlistId: wishlist.id, productId } },
    create: { wishlistId: wishlist.id, productId },
    update: {}
  });
  return { item };
});

app.get("/orders", async (request, reply) => {
  const session = await requireUser(request, reply);
  if (!session) return;
  const orders = await prisma.order.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: "desc" },
    include: { items: true, payment: true }
  });
  return { orders };
});

app.post("/checkout", async (request, reply) => {
  const session = await requireUser(request, reply);
  if (!session) return;
  const data = parseBody(checkoutSchema, request.body);
  const cart = await prisma.cart.findUnique({
    where: { userId: session.id },
    include: { items: { include: { product: true, variant: true } } }
  });
  if (!cart || cart.items.length === 0) {
    reply.code(400).send({ message: "Cart is empty" });
    return;
  }
  const totals = calculateOrderTotals(cart.items.map((item) => ({ price: item.variant.salePrice, quantity: item.quantity })));
  const order = await prisma.order.create({
    data: {
      orderNumber: createOrderNumber(),
      userId: session.id,
      status: data.paymentMethod === "COD" ? "PROCESSING" : "PENDING",
      subtotal: totals.subtotal,
      shippingFee: totals.shippingFee,
      tax: totals.tax,
      total: totals.total,
      shippingAddress: data.address,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          name: item.product.name,
          sku: item.variant.sku,
          size: item.variant.size,
          color: item.variant.color,
          price: item.variant.salePrice,
          quantity: item.quantity
        }))
      },
      payment: {
        create: { provider: data.paymentMethod, amount: totals.total, status: data.paymentMethod === "COD" ? "AUTHORIZED" : "CREATED" }
      }
    },
    include: { payment: true }
  });

  if (data.paymentMethod === "COD") {
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return { order, payment: { mode: "COD" } };
  }

  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    reply.code(500).send({ message: "Razorpay keys are not configured" });
    return;
  }

  const razorpay = new Razorpay({ key_id: env.RAZORPAY_KEY_ID, key_secret: env.RAZORPAY_KEY_SECRET });
  const razorpayOrder = await razorpay.orders.create({
    amount: totals.total,
    currency: "INR",
    receipt: order.orderNumber,
    notes: { orderId: order.id }
  });
  await prisma.payment.update({ where: { orderId: order.id }, data: { providerOrderId: razorpayOrder.id } });
  return { order, payment: { mode: "RAZORPAY", razorpayOrder } };
});

app.post("/checkout/verify", async (request, reply) => {
  const session = await requireUser(request, reply);
  if (!session) return;
  const data = parseBody(verifyPaymentSchema, request.body);
  if (!env.RAZORPAY_KEY_SECRET) {
    reply.code(500).send({ message: "Razorpay secret is not configured" });
    return;
  }
  const ok = verifyRazorpaySignature({
    razorpayOrderId: data.razorpayOrderId,
    razorpayPaymentId: data.razorpayPaymentId,
    razorpaySignature: data.razorpaySignature,
    secret: env.RAZORPAY_KEY_SECRET
  });
  if (!ok) {
    reply.code(400).send({ message: "Invalid payment signature" });
    return;
  }
  const payment = await prisma.payment.update({
    where: { orderId: data.orderId },
    data: { providerOrderId: data.razorpayOrderId, providerPaymentId: data.razorpayPaymentId, status: "CAPTURED" },
    include: { order: true }
  });
  await prisma.order.update({ where: { id: data.orderId }, data: { status: "PAID" } });
  const cart = await prisma.cart.findUnique({ where: { userId: session.id } });
  if (cart) await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  return { payment };
});

app.get("/pages/:slug", async (request, reply) => {
  const { slug } = request.params as { slug: string };
  const page = await prisma.page.findFirst({ where: { slug, status: "PUBLISHED" } });
  if (!page) {
    reply.code(404).send({ message: "Page not found" });
    return;
  }
  return { page };
});

app.get("/admin/dashboard", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const [orders, users, products, lowStock] = await Promise.all([
    prisma.order.aggregate({ _sum: { total: true }, _count: true }),
    prisma.user.count(),
    prisma.product.count(),
    prisma.productVariant.count({ where: { stock: { lte: 5 } } })
  ]);
  return { revenue: orders._sum.total ?? 0, orderCount: orders._count, users, products, lowStock };
});

app.get("/admin/products", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  return { products: await prisma.product.findMany({ include: { category: true, variants: true, images: true }, orderBy: { createdAt: "desc" } }) };
});

app.post("/admin/products", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const data = parseBody(adminProductSchema, request.body);
  const product = await prisma.product.create({
    data: {
      ...data,
      variants: { create: data.variants },
      images: { create: data.images }
    },
    include: { variants: true, images: true }
  });
  return { product };
});

app.put("/admin/products/:id", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const { id } = request.params as { id: string };
  const data = parseBody(adminProductSchema.partial(), request.body);
  const { variants, images, ...productData } = data;

  const product = await prisma.$transaction(async (tx) => {
    if (variants) {
      await tx.productVariant.deleteMany({ where: { productId: id } });
      await tx.productVariant.createMany({ data: variants.map(v => ({ ...v, productId: id })) });
    }
    if (images) {
      await tx.productImage.deleteMany({ where: { productId: id } });
      await tx.productImage.createMany({ data: images.map(i => ({ ...i, productId: id })) });
    }
    return tx.product.update({
      where: { id },
      data: productData,
      include: { variants: true, images: true }
    });
  });

  return { product };
});

app.delete("/admin/products/:id", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const { id } = request.params as { id: string };
  await prisma.product.delete({ where: { id } });
  return { ok: true };
});

app.get("/admin/categories", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  return { categories: await prisma.category.findMany({ orderBy: { displayRank: "asc" } }) };
});

app.post("/admin/categories", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const category = await prisma.category.create({ data: parseBody(adminCategorySchema, request.body) });
  return { category };
});

app.put("/admin/categories/:id", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const { id } = request.params as { id: string };
  const category = await prisma.category.update({ where: { id }, data: parseBody(adminCategorySchema.partial(), request.body) });
  return { category };
});

app.delete("/admin/categories/:id", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const { id } = request.params as { id: string };
  await prisma.category.delete({ where: { id } });
  return { ok: true };
});

app.get("/admin/pages", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  return { pages: await prisma.page.findMany({ orderBy: { updatedAt: "desc" } }) };
});

app.post("/admin/pages", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const page = await prisma.page.create({ data: parseBody(adminPageSchema, request.body) });
  return { page };
});

app.put("/admin/pages/:id", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const { id } = request.params as { id: string };
  const page = await prisma.page.update({ where: { id }, data: parseBody(adminPageSchema.partial(), request.body) });
  return { page };
});

app.get("/admin/orders", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  return { orders: await prisma.order.findMany({ include: { user: true, items: true, payment: true }, orderBy: { createdAt: "desc" } }) };
});

app.put("/admin/orders/:id/status", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const { id } = request.params as { id: string };
  const data = parseBody(orderStatusSchema, request.body);
  const order = await prisma.order.update({ where: { id }, data });
  return { order };
});

app.get("/admin/users", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  return { users: await prisma.user.findMany({ include: { orders: true }, orderBy: { createdAt: "desc" } }) };
});

app.post("/admin/upload", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const data = await request.file();
  if (!data) {
    reply.code(400).send({ message: "No file uploaded" });
    return;
  }
  const filename = `${Date.now()}-${data.filename.replace(/\s+/g, "-")}`;
  const uploadPath = path.resolve(process.cwd(), "uploads", filename);
  await pipeline(data.file, fs.createWriteStream(uploadPath));
  return { url: `${env.NEXT_PUBLIC_API_URL}/uploads/${filename}` };
});

app.get("/admin/hero-banners", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  return { banners: await prisma.heroBanner.findMany({ orderBy: { rank: "asc" } }) };
});

app.post("/admin/hero-banners", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const banner = await prisma.heroBanner.create({ data: parseBody(adminHeroBannerSchema, request.body) });
  return { banner };
});

app.put("/admin/hero-banners/:id", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const { id } = request.params as { id: string };
  const banner = await prisma.heroBanner.update({ where: { id }, data: parseBody(adminHeroBannerSchema.partial(), request.body) });
  return { banner };
});

app.delete("/admin/hero-banners/:id", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const { id } = request.params as { id: string };
  await prisma.heroBanner.delete({ where: { id } });
  return { ok: true };
});

app.get("/admin/site-config", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  return { configs: await prisma.siteConfig.findMany() };
});

app.post("/admin/site-config", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const data = parseBody(adminSiteConfigSchema, request.body);
  await prisma.siteConfig.deleteMany(); // Replace all for simplicity
  await prisma.siteConfig.createMany({ data });
  return { ok: true };
});

app.get("/admin/menu-items", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  return { items: await prisma.menuItem.findMany({ orderBy: { rank: "asc" } }) };
});

app.post("/admin/menu-items", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const item = await prisma.menuItem.create({ data: parseBody(menuItemSchema, request.body) });
  return { item };
});

app.put("/admin/menu-items/:id", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const { id } = request.params as { id: string };
  const item = await prisma.menuItem.update({ where: { id }, data: parseBody(menuItemSchema.partial(), request.body) });
  return { item };
});

app.delete("/admin/menu-items/:id", async (request, reply) => {
  if (!(await requireAdmin(request, reply))) return;
  const { id } = request.params as { id: string };
  await prisma.menuItem.delete({ where: { id } });
  return { ok: true };
});

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof z.ZodError) {
    reply.code(400).send({ message: "Validation failed", issues: error.issues });
    return;
  }
  app.log.error(error);
  reply.code(500).send({ message: "Internal server error" });
});

const port = Number(process.env.PORT ?? 4000);
app.listen({ port, host: "0.0.0.0" }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});
