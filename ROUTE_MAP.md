# Route Map

## Public Endpoints
- `/` - Landing Page
- `/login` - unified Login Page (Owner/Staff fast-auth)
- `/r/:slug` - Public Restaurant Menu
- `/r/:slug/t/:tableId` - Active Table Order View
- `/order/sent` - Post-order Confirmation

## Owner Dashboard (Protected by OwnerRoute)
- `/dashboard` - Dashboard Home
- `/dashboard/menu` - Menu Management
- `/dashboard/tables` - Table Management
- `/dashboard/qr` - QR Generation & Printing
- `/dashboard/history` - Order History
- `/dashboard/logs` - Activity Feed

## Cashier/Staff Dashboard (Protected by StaffRoute)
- `/dashboard/cashier` - Real-time active orders and fast POS actions

## Superadmin (Protected by SuperAdminRoute)
- `/superadmin` - Platform Overview
- `/superadmin/restaurants` - Tenant Management
- `/superadmin/users` - Platform Users
