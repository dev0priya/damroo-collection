# Damroo Collection Agent Operational Guide

This document serves as the central operational guide for the Damroo Collection project. All agent activities must adhere to the rules and standards defined here.

## 1. Project Objective
The objective is to build and maintain a professional clothing e-commerce platform inspired by modern shopping flows (like Nykaa/Myntra). The system consists of a customer storefront, an admin panel, and a backend API, all integrated into a unified monorepo. The project follows a **CMS-First Approach**, ensuring that all frequently changing content is manageable via the Admin Panel.

## 2. Workflow Rules
- **Initial Action**: Always consult `agent.md` and the `/workflows` directory before starting a task.
- **Planning**: For complex tasks, create an `implementation_plan.md` and wait for user approval.
- **Modularization**: Reusable workflows must be stored in `/workflows` and reusable skills in `/skills`.
- **Atomic Commits**: Ensure changes are logical and well-documented.

## 3. Research Rules
- **Before Implementation**: Thoroughly research the existing codebase to understand dependencies and patterns.
- **Documentation**: Record findings in research notes or within the implementation plan.
- **Tools**: Use `grep_search` and `list_dir` to map out affected areas.

## 4. Testing Protocol (MANDATORY)
Before marking any phase or task as complete, the following must be verified:
- **Functionality**: All buttons (Add to Bag, Wishlist, Filter, etc.) must be fully functional.
- **Visuals**: All images must load correctly, be optimized, and maintain consistent dimensions.
- **Navigation**: All links and menus must work properly.
- **CRUD**: Verify all Create, Read, Update, and Delete operations.
- **Responsiveness**: Test UI on different screen sizes.
- **Errors**: Check for console errors or broken links.

## 5. Logging System
- **File**: `log.md`
- **Rule**: Update `log.md` only after successful testing and verification of a phase or sub-phase.
- **Format**: Include tasks completed, status, date/time, and next steps.

## 6. Coding Standards
- **Tech Stack**: Next.js (App Router), TypeScript, Tailwind CSS, Fastify, Prisma, Neon DB.
- **Clean Code**: Follow DRY (Don't Repeat Yourself) principles.
- **Type Safety**: Use TypeScript interfaces/types for all data structures.
- **Styling**: Use Vanilla CSS or Tailwind as per project standards. Avoid placeholders.

## 7. Folder Structure Standards
- `apps/web`: Customer-facing storefront.
- `apps/admin`: Internal management panel.
- `apps/api`: Backend service.
- `packages/db`: Database schema and Prisma client.
- `packages/ui`: Shared UI components.
- `/workflows`: Reusable process documentation.
- `/skills`: Reusable implementation patterns.
- `/design`: UI/UX planning and design systems.

## 8. CMS & Admin Requirements (MANDATORY)
- **Hero Section**: Fully manageable via Admin (Image, Title, Description, CTA).
- **Category Images**: Support upload, update, and preview in Admin.
- **Product Images**: Support multiple images, upload, and custom ordering.
- **Footer & Menus**: Dynamic footer content and navigation menus driven by page records.
- **CMS-First**: No hardcoding of frequently changing content. Use the database for homepage sections, footer, and navigation.

## 9. Response Style Guidelines
- **Conciseness**: Keep responses brief and to the point.
- **Summarization**: Provide a clear summary of work done at the end of each turn.
- **Markdown**: Use GitHub-style markdown for all documentation and responses.

## 9. Phase Execution Rules
- **No Placeholders**: Functional components only. No non-working buttons or broken links.
- **Page Completeness**: Every page must be fully connected, navigable, and responsive before phase completion.
- **Validation**: Only mark a phase as completed in `log.md` after thorough testing as per the Testing Protocol.

## 10. DESIGN FOLDER IS REFERENCE-ONLY (VERY IMPORTANT)

The `/design` folder is the official design reference source provided by the user.

You MUST:
- Read and follow everything inside the `/design` folder exactly
- Match layouts, section order, spacing, structure, and theme as closely as possible

You MUST NOT:
- Create your own planning/design files inside the `/design` folder
- Modify reference files unnecessarily
- Replace the provided structure with your own assumptions

The `/design` folder should only be used for:
- Reading
- Referencing
- Matching implementation

If you need your own implementation notes/files:
→ Create them in separate folders outside `/design`