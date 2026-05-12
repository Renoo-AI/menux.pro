# Known Limitations & TODO

## Missing Functionality
- **Real Database Write Logic in Owner Sections:** Owner dashboard management pages (`MenuManagement`, `TableManagement`) are currently visually stubbed and do not write to Firestore yet.
- **True Firebase Auth for Staff:** Cashier/Staff login uses a mock PIN validator storing a session in localStorage instead of calling a Cloud Function and issuing a valid Firebase Custom Token.
- **Backend Enforced Rate Limiting:** Order creation and PIN logins currently do not use honeypots or robust rate limiting.
- **Waitstaff Views:** The `waiter` roles exist in types but do not have dedicated optimized UI routes yet.

## Scalability Debts
- Pagination is not implemented on the Cashier Dashboard.
- Sub-collection counts (like total revenue) are currently aggregated client-side via a single `getDocs` fetch. This requires Firebase Cloud Functions and dedicated aggregation documents before scaling beyond a few hundred orders a day per tenant.
