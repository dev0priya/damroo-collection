# Deployment Workflow

Steps for preparing and executing a deployment.

## Steps
1. **Type Checking**: Run `npm run typecheck` across the monorepo.
2. **Building**: Run `npm run build` to ensure all apps and packages compile.
3. **Environment Sync**: Verify all production environment variables are set in the deployment platform (e.g., Vercel, Neon).
4. **Database Migration**: Run `npm run db:migrate` if there are schema changes.
5. **Final Smoke Test**: Verify core flows (Home -> Shop -> Product -> Cart -> Checkout) in a staging environment if available.
