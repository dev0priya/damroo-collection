# API Fetching Skill

Standardized approach for data fetching in the Next.js apps.

## Pattern
- **Client Side**: Use `useEffect` or dedicated hooks with error handling.
- **Server Side**: Use `fetch` in server components with proper caching strategies.
- **Error Handling**: Always handle `4xx` and `5xx` responses gracefully in the UI.
- **Environment**: Use `NEXT_PUBLIC_API_URL` for endpoint construction.
