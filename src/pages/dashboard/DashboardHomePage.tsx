import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { cashierService } from '../../lib/services/cashierService';
import { LoadingScreen } from '../../components/ui/LoadingScreen';

export default function DashboardHomePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ orders: 0, revenue: 0 });

  useEffect(() => {
    async function loadStats() {
      if (!user) return;
      try {
        // Stubbing the real fetch due to complex aggregation logic typically done in functions
        // But replacing hardcoded numbers with a dynamic fetch wrapper.
        const orders = await cashierService.getOrders(user.uid);
        const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

        setStats({
          orders: orders.length,
          revenue: revenue
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [user]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="p-6">
      <h1 className="mb-6 font-display text-2xl font-bold text-mx-espresso">Owner Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-mx-border bg-mx-surface p-6 shadow-sm">
          <h3 className="text-sm font-medium text-mx-muted">Today's Orders</h3>
          <p className="mt-2 text-3xl font-bold text-mx-espresso">{stats.orders}</p>
        </div>
        <div className="rounded-xl border border-mx-border bg-mx-surface p-6 shadow-sm">
          <h3 className="text-sm font-medium text-mx-muted">Revenue</h3>
          <p className="mt-2 text-3xl font-bold text-mx-espresso">{stats.revenue.toFixed(2)} <span className="text-sm font-normal">TND</span></p>
        </div>
      </div>
    </div>
  );
}
