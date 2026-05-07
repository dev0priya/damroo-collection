# Homepage Section Architecture

This document defines the structural components for the Damroo Collection homepage, ensuring all sections are CMS-controlled and scalable.

## 1. Global Hero Banner (`HeroBanner` Model)
- **Primary Usage**: Hero slider at the top of the homepage.
- **CMS Control**: Add, Edit, Delete, Reorder (Rank), Toggle (Active).
- **Responsive Handling**:
  - Desktop: 1920x800px (approx 21:9 aspect ratio).
  - Mobile: 800x1000px (approx 4:5 aspect ratio).

## 2. Featured Category Grid (`Category` Model)
- **Criteria**: Categories where `imageUrl` is not null and `isActive` is true.
- **Display**: Circular cards with name and subtle hover scaling.
- **Sorting**: Ordered by `displayRank` ASC.

## 3. Product Highlights (`Product` Model)
- **Featured Section**: Products marked `isFeatured = true`.
- **Best Sellers**: Products marked `isBestSeller = true`.
- **Interaction**: Hover to see secondary images (Gallery index 1).

## 4. Brand Promise Section (`SiteConfig` Model)
- **CMS Integration**: Values stored in `SiteConfig` or a static section if rarely changed.
- **Design**: Clean icons with bold typography.

## 5. About the Brand (`Page` or `SiteConfig`)
- **Content**: A snippet from the "About Us" page or a dedicated `about_snippet` config.
- **Image**: Dedicated `about_image` config.

## 6. Footer CMS (`MenuItem` & `SiteConfig`)
- **Navigation**: Items with `position = "FOOTER"`.
- **Pages**: Dynamically linked to `Page` records.
- **Branding**: `footer_logo`, `footer_text`, `copyright_text` stored in `SiteConfig`.
- **Social**: `social_instagram`, `social_facebook`, `social_twitter`, `social_linkedin` stored in `SiteConfig`.
