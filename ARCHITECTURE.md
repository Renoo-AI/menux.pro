# MenuxPro Architecture

## Overview
MenuxPro is a multi-tenant React SaaS built with Vite, TypeScript, and Firebase for real-time QR-based table ordering and POS integration.

## Core Stack
- **Frontend Framework:** React 19 via Vite
- **Language:** TypeScript (strict mode enabled)
- **Styling:** Tailwind CSS (Custom prefix and palette logic in tailwind.config.js)
- **Routing:** React Router v7
- **Backend & Database:** Firebase Auth, Firestore, and Cloud Functions (future-proofed).

## Directory Structure
- `src/components`: UI primitives (`/ui`), layouts, and domain-specific isolated components (`/auth`, `/menu`, `/orders`).
- `src/contexts`: Lightweight state contexts. `AuthContext` (owner/admin auth), `ToastContext`, and `CartContext`.
- `src/lib`: Core utilities. Contains `firebase.ts`, environment configs, routing logic, domain services (`/services`), and strict types (`/types`).
- `src/pages`: Feature views separated by actor domains (`/public`, `/auth`, `/dashboard`, `/superadmin`).

## Architectural Rules
1. **Isolated Data Fetching:** UI components rely on decoupled service functions (`src/lib/services/`). No direct firestore queries in UI besides targeted realtime listeners (like Cashier dashboard).
2. **Context Minimization:** No monolithic AppState. Contexts only handle truly global concerns (Auth, Toasts, Cart).
3. **Route Guards:** Strict route boundaries are implemented. Public endpoints must never load internal layouts or expose sensitive flags.
4. **Realtime Isolation:** Real-time listeners properly subscribe and unsubscribe on mount/unmount to prevent memory leaks (critical for Cashier UX).
