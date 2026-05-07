import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const productQuerySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  minPrice: z.coerce.number().int().optional(),
  maxPrice: z.coerce.number().int().optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  sort: z.enum(["newest", "price-asc", "price-desc", "rating"]).default("newest"),
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(48).default(24)
});

export const cartItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  quantity: z.number().int().min(1).max(10)
});

export const addressSchema = z.object({
  label: z.string().min(2),
  line1: z.string().min(4),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/),
  country: z.string().default("India")
});

export const checkoutSchema = z.object({
  address: addressSchema,
  paymentMethod: z.enum(["RAZORPAY", "COD"]).default("RAZORPAY")
});

export const verifyPaymentSchema = z.object({
  orderId: z.string(),
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string()
});

export const adminProductSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(2),
  slug: z.string().min(2),
  brand: z.string().min(2),
  description: z.string().min(10),
  material: z.string().optional(),
  care: z.string().optional(),
  status: z.string().default("PUBLISHED"),
  isFeatured: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  variants: z.array(
    z.object({
      sku: z.string().min(3),
      size: z.string().min(1),
      color: z.string().min(1),
      mrp: z.number().int().positive(),
      salePrice: z.number().int().positive(),
      stock: z.number().int().min(0),
      lowStockAt: z.number().int().min(0).default(5)
    })
  ),
  images: z.array(z.object({ url: z.string().url(), alt: z.string(), rank: z.number().int().default(0) }))
});

export const adminCategorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  parentId: z.string().optional(),
  displayRank: z.number().int().default(0),
  isActive: z.boolean().default(true)
});

export const adminPageSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  body: z.string().min(2),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
  metaTitle: z.string().optional()
});

export const orderStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"])
});

export const adminHeroBannerSchema = z.object({
  imageUrl: z.string().url(),
  title: z.string().min(2),
  description: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  isActive: z.boolean().default(true),
  rank: z.number().int().default(0)
});

export const adminSiteConfigSchema = z.array(
  z.object({
    key: z.string(),
    value: z.string()
  })
);

export const menuItemSchema = z.object({
  label: z.string().min(1),
  pageId: z.string().optional().nullable(),
  externalUrl: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  rank: z.number().int().default(0),
  position: z.enum(["HEADER", "FOOTER"]).default("HEADER")
});
