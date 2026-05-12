import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { CartProvider } from './contexts/CartContext';

import { OwnerRoute } from './components/auth/OwnerRoute';
import { StaffRoute } from './components/auth/StaffRoute';
import { SuperAdminRoute } from './components/auth/SuperAdminRoute';
import { LoadingScreen } from './components/ui/LoadingScreen';

// Lazy loading pages for performance
const LandingPage = lazy(() => import('./pages/public/LandingPage'));
const PublicMenuPage = lazy(() => import('./pages/public/PublicMenuPage'));
const TableOrderPage = lazy(() => import('./pages/public/TableOrderPage'));
const OrderSentPage = lazy(() => import('./pages/public/OrderSentPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));

const LoginPage = lazy(() => import('./pages/auth/LoginPage'));

const CashierDashboardPage = lazy(() => import('./pages/dashboard/CashierDashboardPage'));

const DashboardHomePage = lazy(() => import('./pages/dashboard/DashboardHomePage'));
const MenuManagementPage = lazy(() => import('./pages/dashboard/MenuManagementPage'));
const TableManagementPage = lazy(() => import('./pages/dashboard/TableManagementPage'));
const QRManagementPage = lazy(() => import('./pages/dashboard/QRManagementPage'));
const OrderHistoryPage = lazy(() => import('./pages/dashboard/OrderHistoryPage'));
const ActivityLogPage = lazy(() => import('./pages/dashboard/ActivityLogPage'));

const SuperAdminOverviewPage = lazy(() => import('./pages/superadmin/SuperAdminOverviewPage'));

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/r/:slug" element={<PublicMenuPage />} />
              <Route path="/r/:slug/t/:tableId" element={<TableOrderPage />} />
              <Route path="/order/sent" element={<OrderSentPage />} />

              {/* Staff/Cashier Routes */}
              <Route element={<StaffRoute />}>
                <Route path="/dashboard/cashier" element={<CashierDashboardPage />} />
              </Route>

              {/* Owner/Admin Routes */}
              <Route element={<OwnerRoute />}>
                <Route path="/dashboard" element={<DashboardHomePage />} />
                <Route path="/dashboard/menu" element={<MenuManagementPage />} />
                <Route path="/dashboard/tables" element={<TableManagementPage />} />
                <Route path="/dashboard/qr" element={<QRManagementPage />} />
                <Route path="/dashboard/history" element={<OrderHistoryPage />} />
                <Route path="/dashboard/logs" element={<ActivityLogPage />} />
              </Route>

              {/* Superadmin Routes */}
              <Route element={<SuperAdminRoute />}>
                <Route path="/superadmin" element={<SuperAdminOverviewPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          </BrowserRouter>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
