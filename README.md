# MenuxPro

MenuxPro is a premium digital menu, table ordering, and cashier dashboard SaaS tailored for cafes and restaurants. It is built as a highly responsive multi-tenant single-page application prioritizing speed, operational resilience during rush hours, and architectural correctness.

## Key Features

- **Public Digital Menu:** Fast, mobile-first QR menus.
- **Table Ordering:** Seamless cart and checkout flow tailored to tables.
- **Cashier POS Dashboard:** Real-time stream of incoming orders via Firestore, allowing staff to accept, mark as paid, and close tables.
- **Owner Dashboard:** Multi-tenant dashboards for managing menus, tables, generating QR codes, and viewing logs/revenue.
- **Superadmin Panel:** Global platform control for tenant management and billing tiers.

## Tech Stack

- **Frontend:** React 19 + Vite (TypeScript, Strict Mode)
- **Routing:** React Router v7
- **Styling:** Tailwind CSS (Custom prefixing and premium color tokens)
- **Database & Auth:** Firebase Firestore (real-time listeners, transactions), Firebase Auth
- **Hosting:** Firebase Hosting (SPA Rewrite configuration)

## Getting Started

### Prerequisites
- Node.js >= 18
- Firebase Project configured for Auth, Firestore, and Hosting

### Installation
1. Clone the repository and install dependencies:
   `npm install`

2. Configure environment variables:
   Copy `.env.example` to `.env.local` and add your Firebase credentials.
   `cp .env.example .env.local`
   **Important:** `VITE_SUPERADMIN_UID` must match the UID of the user you want to have root access to the superadmin panel.

3. Run the development server:
   `npm run dev`

## Deployment

The application is configured to deploy as a static SPA via Firebase Hosting.

1. Create a production build:
   `npm run build`

2. Deploy using Firebase CLI:
   `firebase deploy --only hosting`

## Project Documentation
Please refer to the following guides for detailed implementation standards:
- [Architecture & State Management](ARCHITECTURE.md)
- [Firestore Schema](FIRESTORE_SCHEMA.md)
- [Routing Maps](ROUTE_MAP.md)
- [Deployment Checklist](DEPLOY_CHECKLIST.md)
- [Security Guidelines](SECURITY_CHECKLIST.md)
