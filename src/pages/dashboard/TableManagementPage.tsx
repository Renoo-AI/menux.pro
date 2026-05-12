import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { tableService } from '../../lib/services/tableService';
import { LoadingScreen } from '../../components/ui/LoadingScreen';
import { useToast } from '../../contexts/ToastContext';
import type { RestaurantTable } from '../../lib/types/table';

export default function TableManagementPage() {
  const { user } = useAuth();
  const { error } = useToast();
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTables() {
      if (!user) return;
      try {
        const fetchedTables = await tableService.getTables(user.uid);
        setTables(fetchedTables);
      } catch (err) {
        console.error(err);
        error("Failed to fetch tables");
      } finally {
        setLoading(false);
      }
    }
    loadTables();
  }, [user, error]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-mx-espresso">Table & QR Management</h1>
        <Button>Add Table</Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {tables.length === 0 ? (
           <div className="col-span-full py-12 text-center text-mx-muted">No tables configured.</div>
        ) : (
          tables.map((table) => (
            <div key={table.id} className="flex items-center justify-between rounded-xl border border-mx-border bg-mx-surface p-6 shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-mx-espresso">{table.label}</h3>
                <p className="text-sm text-mx-success">{table.status}</p>
              </div>
              <Button variant="outline" size="sm">Get QR</Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
