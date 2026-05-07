---
name: Fashion Forward
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#5b4042'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#8f6f72'
  outline-variant: '#e3bdc0'
  surface-tint: '#bd0043'
  primary: '#b90041'
  on-primary: '#ffffff'
  primary-container: '#df2457'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb2ba'
  secondary: '#5a5d73'
  on-secondary: '#ffffff'
  secondary-container: '#dbdef8'
  on-secondary-container: '#5e6177'
  tertiary: '#575b6b'
  on-tertiary: '#ffffff'
  tertiary-container: '#707484'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9dc'
  primary-fixed-dim: '#ffb2ba'
  on-primary-fixed: '#400011'
  on-primary-fixed-variant: '#910031'
  secondary-fixed: '#dee1fa'
  secondary-fixed-dim: '#c2c5de'
  on-secondary-fixed: '#161b2d'
  on-secondary-fixed-variant: '#42465a'
  tertiary-fixed: '#dfe2f4'
  tertiary-fixed-dim: '#c2c6d7'
  on-tertiary-fixed: '#171b28'
  on-tertiary-fixed-variant: '#424655'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2.5rem
  container-max: 1280px
  gutter: 1.5rem
---

## Brand & Style

This design system is built on a foundation of **Editorial Minimalism**. It bridges the gap between high-street accessibility and luxury boutique aesthetics. The personality is confident, trendy, and highly curated, designed to make product imagery the hero of the experience.

The visual language utilizes heavy whitespace and a restricted color palette to evoke a sense of "digital silk"—smooth, premium, and effortless. By combining the structure of a high-end fashion magazine with the speed of modern e-commerce, the system establishes immediate trust and professional authority. Interactive elements are designed to be snappy and responsive, providing the "click" of a physical luxury retail experience.

## Colors

The color strategy uses a high-contrast relationship to drive user action. 

- **Primary (#FF3F6C):** A vibrant "Vivid Raspberry" used exclusively for Call-to-Action (CTA) elements, price highlights, and active states. It provides the "vibrant" energy required for a fashion-forward brand.
- **Secondary (#282C3F):** A deep "Midnight Slate" used for primary typography and iconography to ensure maximum legibility and a grounded, professional feel.
- **Tertiary (#535766):** A "Cool Pewter" for secondary information, metadata, and borders, softening the interface where high contrast is not required.
- **Neutral (#FAFBFC / #FFFFFF):** The canvas. A mix of pure white for product cards and a very light off-white for section backgrounds to create subtle structural separation without using heavy lines.

## Typography

This system employs a sophisticated typographic pairing to balance tradition with modernity.

- **Headlines:** Uses **Noto Serif**. This choice brings an editorial, "Vogue-esque" authority to the design. Large headlines should use tighter tracking and generous line height to maintain a premium feel.
- **Body & UI:** Uses **Manrope**. A highly functional sans-serif with a modern geometric influence. It ensures that product descriptions and navigation remain legible at all sizes.
- **Labels:** Use uppercase Manrope with slight letter-spacing for category tags and navigation items to create a distinct visual hierarchy from body text.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid Grid**. On desktop, content is contained within a 1280px central container using a 12-column grid. On mobile, the system transitions to a fluid 2-column layout for product listings to maximize image size.

Spacing is governed by an 8px rhythmic scale. Generous whitespace (the 'xl' and 'lg' units) is encouraged between sections to prevent the "cluttered marketplace" look, favoring a "curated gallery" experience instead.

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and **Tonal Layering** rather than heavy borders.

1.  **Low Elevation:** Surface-level cards use a very soft, diffused shadow (0px 4px 20px rgba(40, 44, 63, 0.05)) to lift them slightly from the neutral background.
2.  **High Elevation:** Modals and dropdown menus use a more pronounced shadow with a wider blur to indicate temporary interaction layers.
3.  **Flat States:** Form inputs and inactive buttons remain flat with a 1px subtle border (#EAEAEC) to keep the UI clean and grounded.

## Shapes

The design system uses **Soft (Level 1)** roundedness. 

A 4px (0.25rem) base radius is applied to buttons, cards, and input fields. This subtle rounding provides a modern, approachable feel while maintaining the structural sharpness associated with high-end fashion branding. 

- **Exceptions:** Promotional banners and full-bleed hero sections should remain sharp (0px) to maximize the impact of photography. Search bars may occasionally use pill-shapes (Level 3) to stand out as a primary utility.

## Components

### Buttons
Primary buttons use the Fashion Pink (#FF3F6C) background with white text. They should feel substantial, with generous horizontal padding (24px+). Secondary buttons use a "Midnight Slate" outline. Hover states should involve a slight darkening of the background color or a subtle lift via shadow.

### Cards
Product cards are the core component. They feature high-quality imagery with no border, using only a subtle shadow on hover to indicate interactivity. Text alignment within cards is typically left-aligned, with the price highlighted in the secondary color or primary pink for sales.

### Chips & Tags
Used for sizes, colors, or "New Arrival" labels. These should be minimal—light gray backgrounds with small, bold Manrope text.

### Input Fields
Clean and unobtrusive. Use a bottom-only border or a very light gray stroke that thickens/darkens on focus. Error states should use a classic red, distinct from the brand pink to avoid confusion.

### Additional Components
- **Wishlist Heart:** A signature interactive element using the Primary Pink for the active state.
- **Product Filter Drawers:** Clean, slide-out panels with high-contrast typography and plenty of breathing room between options.