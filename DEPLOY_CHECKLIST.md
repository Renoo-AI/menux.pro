# MenuxPro Deployment Checklist

## Environment
- [ ] Ensure `.env.local` is present or environment variables are configured in CI/CD.
- [ ] Verify `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`, and other required keys are correctly mapped for the production environment.
- [ ] Ensure `VITE_SUPERADMIN_UID` is set securely.

## Build and Code Quality
- [x] Run `npm run lint` and verify zero errors/warnings.
- [x] Run `npm run build` and ensure the build succeeds without any missing modules or unresolved imports.
- [x] No `console.log` spam left in production components.
- [x] No `any` typings that cause build warnings.

## Firebase & Security
- [x] Ensure `firebase.json` has standard web-caching headers and rewrite rules for SPAs.
- [ ] Deploy and verify strict Firestore Security Rules.
- [ ] Deploy Cloud Functions (if any, required for Staff PIN login rate-limiting and safe order creation).
- [ ] Set up Firebase App Check (optional but recommended before heavy marketing).

## Functionality & UX
- [x] Public Menu loads fast and renders correctly on mobile.
- [x] Cart logic maintains state and calculates totals properly.
- [x] Cashier dashboard handles real-time updates without leaking listeners.
- [x] Navigation guards correctly redirect unauthorized users.
