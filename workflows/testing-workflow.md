# Testing Workflow

This workflow defines the mandatory testing steps to ensure quality and functionality.

## Pre-Completion Checklist
- [ ] **Button Check**: Click every button on the page (Add to Bag, Wishlist, Filters, etc.).
- [ ] **Navigation Check**: Ensure all links point to the correct locations.
- [ ] **Image Verification**: Check for broken images and ensure proper aspect ratios.
- [ ] **Responsive Design**: Verify layout on Mobile (375px), Tablet (768px), and Desktop (1200px+).
- [ ] **Console Watch**: Open DevTools and check for any errors or warnings.
- [ ] **Data Integrity**: Verify CRUD operations reflect correctly in the UI and database.

## Validation Protocol
1. Run local dev server (`npm run dev`).
2. Navigate through the affected pages.
3. Manually perform the checklist above.
4. Record results in `log.md`.
