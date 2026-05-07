# Neon DB Connection Skill

Managing connections to Neon PostgreSQL.

## Pattern
- **Configuration**: Use `DATABASE_URL` for runtime and `DIRECT_URL` for migrations.
- **Prisma**: Define schema in `packages/db/prisma/schema.prisma`.
- **Migrations**: Always run `npm run db:migrate` for schema updates.
- **Seeding**: Use `db/prisma/seed.ts` for demo data.
