# Image Optimization Skill

Best practices for handling images in the platform.

## Pattern
- **Format**: Use WebP or AVIF for better compression.
- **Next.js Image**: Always use the `<Image />` component with `next/image`.
- **Dimensions**: Provide `width` and `height` to prevent layout shifts (CLS).
- **Lazy Loading**: Enabled by default in Next.js; use `priority` for above-the-fold images.
- **Responsive**: Use `sizes` attribute for proper scaling across devices.
