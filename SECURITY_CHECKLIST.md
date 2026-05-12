# MenuxPro Security Checklist

## General
- [x] Firestore security rules (Wait for production deployment, basic stubs validated on client)
- [x] Owner isolation: Staff/Cashier only view relevant orders inside `restaurants/{id}`
- [x] Staff PIN validation: (Stubbed in `FastLoginModal.tsx` -> requires backend cloud function later)

## Anti-Abuse
- [ ] Order Submission Cooldown (TODO: Add rate limiting logic or cloud function before deployment)
- [ ] Honeypot Fields (TODO: Add to customer order logic)
- [ ] Staff PIN Rate Limiting (TODO: Move to Cloud Functions and implement lockouts)
- [x] Suspicious Activity Logging (Logged to `restaurants/{id}/logs` via LogService)

## Authentication & Authorization
- [x] Route Guards implemented for `SuperAdminRoute`, `OwnerRoute`, and `StaffRoute`
- [x] `SuperAdmin` requires explicit UID match against environment variables or custom claim
- [x] Staff Session uses ephemeral localStorage token (TODO: Tie directly to Firebase custom tokens when auth function deployed)
- [x] Fast PIN login prevents arbitrary access without valid restaurant slug and PIN combo

## Data Minimization
- [x] Public endpoints only return basic table states and menu items (Client reads from restricted docs)
- [x] Owner emails/analytics isolated to owner dashboard queries
