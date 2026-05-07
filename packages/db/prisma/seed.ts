import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin@12345", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@damroo.test" },
    update: {},
    create: {
      name: "Damroo Admin",
      email: "admin@damroo.test",
      passwordHash,
      role: "ADMIN",
      cart: { create: {} },
      wishlist: { create: {} }
    }
  });

  const women = await prisma.category.upsert({
    where: { slug: "women" },
    update: {},
    create: { name: "Women", slug: "women", displayRank: 1, imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b" }
  });
  const men = await prisma.category.upsert({
    where: { slug: "men" },
    update: {},
    create: { name: "Men", slug: "men", displayRank: 2, imageUrl: "https://images.unsplash.com/photo-1516257984-b1b4d707412e" }
  });
  const ethnic = await prisma.category.upsert({
    where: { slug: "ethnic-wear" },
    update: {},
    create: { name: "Ethnic Wear", slug: "ethnic-wear", parentId: women.id, displayRank: 3 }
  });

  const products = [
    {
      categoryId: ethnic.id,
      name: "Zari Woven Festive Saree",
      slug: "zari-woven-festive-saree",
      brand: "Damroo Heritage",
      description: "Elegant festive saree with woven zari accents and unstitched blouse piece.",
      material: "Art Silk",
      care: "Dry clean only",
      isFeatured: true,
      isBestSeller: true,
      variants: [
        { sku: "DHR-SAREE-GRN-FREE", size: "Free", color: "Green", mrp: 499900, salePrice: 289900, stock: 18 },
        { sku: "DHR-SAREE-BLU-FREE", size: "Free", color: "Blue", mrp: 499900, salePrice: 289900, stock: 9 }
      ],
      images: [
        "https://images.unsplash.com/photo-1610030469668-8e9f641a3e2f",
        "https://images.unsplash.com/photo-1610189019256-2c7ed6f41ce5"
      ]
    },
    {
      categoryId: men.id,
      name: "Tailored Cotton Kurta",
      slug: "tailored-cotton-kurta",
      brand: "Damroo Studio",
      description: "Breathable cotton kurta with a clean mandarin collar for daily and festive wear.",
      material: "Cotton",
      care: "Machine wash cold",
      isFeatured: true,
      isBestSeller: false,
      variants: [
        { sku: "DST-KURTA-WHT-M", size: "M", color: "White", mrp: 249900, salePrice: 149900, stock: 22 },
        { sku: "DST-KURTA-WHT-L", size: "L", color: "White", mrp: 249900, salePrice: 149900, stock: 14 }
      ],
      images: ["https://images.unsplash.com/photo-1617137968427-85924c800a22"]
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        categoryId: product.categoryId,
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        description: product.description,
        material: product.material,
        care: product.care,
        isFeatured: product.isFeatured,
        isBestSeller: product.isBestSeller,
        ratingAverage: 4.4,
        ratingCount: 128,
        variants: { create: product.variants },
        images: { create: product.images.map((url, rank) => ({ url, alt: product.name, rank })) }
      }
    });
  }

  const pages = [
    { title: "About Damroo", slug: "about", body: "Damroo Collection curates Indian and contemporary clothing with transparent pricing and reliable delivery." },
    { title: "Contact Us", slug: "contact", body: "For support, email care@damroo.test or use the order help center." },
    { title: "Privacy Policy", slug: "privacy", body: "Your data is secure with us. We use it only to process orders and improve your experience." },
    { title: "Terms & Conditions", slug: "terms", body: "By using our service, you agree to our terms of service." }
  ];

  for (const page of pages) {
    await prisma.page.upsert({ where: { slug: page.slug }, update: page, create: page });
  }

  // Seed Hero Banners
  await prisma.heroBanner.createMany({
    data: [
      {
        title: "Damroo Collection",
        description: "Professional clothing e-commerce platform inspired by Nykaa/Myntra shopping flows.",
        imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
        ctaText: "Shop Now",
        ctaLink: "/shop",
        rank: 1
      },
      {
        title: "Festive Edit Now Live",
        description: "Sarees, kurtas, dresses, and everyday essentials curated for fit, comfort, and fast checkout.",
        imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
        ctaText: "Explore Ethnic",
        ctaLink: "/shop?category=ethnic-wear",
        rank: 2
      }
    ]
  });

  // Seed Site Config (Footer)
  await prisma.siteConfig.createMany({
    data: [
      { key: "footer_about", value: "Curated clothing, reliable delivery, and easy returns for modern Indian wardrobes." },
      { key: "footer_copyright", value: "© 2026 Damroo Collection. All rights reserved." },
      { key: "social_instagram", value: "https://instagram.com/damroo" },
      { key: "social_facebook", value: "https://facebook.com/damroo" }
    ]
  });

  // Seed Navigation Menus
  const aboutPage = await prisma.page.findUnique({ where: { slug: "about" } });
  const contactPage = await prisma.page.findUnique({ where: { slug: "contact" } });
  const privacyPage = await prisma.page.findUnique({ where: { slug: "privacy" } });

  await prisma.menuItem.createMany({
    data: [
      // Header Menus
      { label: "Women", externalUrl: "/shop?category=women", position: "HEADER", rank: 1 },
      { label: "Men", externalUrl: "/shop?category=men", position: "HEADER", rank: 2 },
      { label: "Ethnic Wear", externalUrl: "/shop?category=ethnic-wear", position: "HEADER", rank: 3 },
      { label: "About", pageId: aboutPage?.id, position: "HEADER", rank: 4 },
      // Footer Menus
      { label: "Our Story", pageId: aboutPage?.id, position: "FOOTER", rank: 1 },
      { label: "Contact Us", pageId: contactPage?.id, position: "FOOTER", rank: 2 },
      { label: "Privacy Policy", pageId: privacyPage?.id, position: "FOOTER", rank: 3 }
    ]
  });

  console.log(`Seeded admin ${admin.email}, sample catalog, and CMS content.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
