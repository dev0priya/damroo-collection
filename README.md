# Damroo Collection

Professional clothing e-commerce platform inspired by Nykaa/Myntra shopping flows.

## Stack

- `apps/web`: customer storefront with Next.js, TypeScript, Tailwind
- `apps/admin`: admin panel with Next.js, TypeScript, Tailwind
- `apps/api`: Fastify REST API with Zod validation
- `packages/db`: Prisma schema/client for Neon PostgreSQL
- `packages/ui`: shared reusable UI primitives
- `packages/config`: shared environment helpers

## Setup

1. Copy `.env.example` to `.env` in the repo root and fill Neon + Razorpay secrets.
2. Install dependencies: `npm install`
3. Generate Prisma client: `npm run db:generate`
4. Apply schema to Neon: `npm run db:migrate`
5. Seed demo data: `npm run db:seed`
6. Run API: `npm run dev`
7. Run storefront: `npm run dev:web`
8. Run admin: `npm run dev:admin`

## Required Env

- `DATABASE_URL`: pooled Neon PostgreSQL runtime URL
- `DIRECT_URL`: direct Neon PostgreSQL migration URL
- `JWT_SECRET`: long random auth secret
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
- `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`

## Test & Build

- `npm run typecheck`
- `npm run test`
- `npm run build`

## Demo Admin

The seed script creates:

- Email: `admin@damroo.test`
- Password: `Admin@12345`
