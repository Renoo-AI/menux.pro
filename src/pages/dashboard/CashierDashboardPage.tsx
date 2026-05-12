import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Order } from '../../lib/types/order';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { cashierService } from '../../lib/services/cashierService';
import { useToast } from '../../contexts/ToastContext';

export default function CashierDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast, error } = useToast();

  // Get staff session from local storage
  const staffSessionStr = localStorage.getItem('staffSession');
  const session = staffSessionStr ? JSON.parse(staffSessionStr) : null;
  const restaurantId = session?.slug || 'demo';

  useEffect(() => {
    if (!restaurantId) return;

    const q = query(
      collection(db, "restaurants", restaurantId, "orders"),
      where("status", "in", ["created", "accepted", "awaiting_payment"]),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];

      setOrders(updatedOrders);
    }, (err) => {
      console.error("Firestore listener error:", err);
      error("Failed to connect to order stream");
    });

    return () => unsubscribe();
  }, [restaurantId, error]);

  const handleAction = async (orderId: string, action: 'accept' | 'pay' | 'close') => {
     try {
       if (action === 'accept') await cashierService.acceptOrder(restaurantId, orderId);
       else if (action === 'pay') await cashierService.markPaid(restaurantId, orderId);
       else if (action === 'close') await cashierService.closeOrder(restaurantId, orderId);

       toast(`Order ${action}ed successfully`, "success");
     } catch (err) {
       console.error(err);
       error(`Failed to ${action} order`);
     }
  };

  return (
    <div className="min-h-screen bg-mx-bg p-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-mx-espresso">Cashier Dashboard</h1>
        <Badge variant="success">Live Stream Active</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {orders.length === 0 ? (
          <div className="col-span-full py-12 text-center text-mx-muted">
            No active orders.
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="flex flex-col rounded-xl border border-mx-border bg-mx-surface shadow-md">
              <div className="flex items-center justify-between border-b border-mx-border p-4">
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-mx-soft px-2 py-1 font-bold text-mx-espresso">
                    Table {order.tableLabel}
                  </span>
                </div>
                <Badge variant={order.status === 'created' ? 'warning' : order.status === 'accepted' ? 'success' : 'info'}>
                  {order.status}
                </Badge>
              </div>

              <div className="flex-1 p-4">
                <ul className="space-y-2">
                  {order.items.map((item: { quantity: number; name: string; unitPrice: number }, idx: number) => (
                    <li key={idx} className="flex justify-between text-sm text-mx-espresso">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="text-mx-muted">{(item.unitPrice * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                {order.customerNote && (
                  <div className="mt-4 rounded bg-mx-soft p-2 text-sm italic text-mx-muted">
                    "{order.customerNote}"
                  </div>
                )}
              </div>

              <div className="border-t border-mx-border bg-mx-bg/50 p-4">
                <div className="mb-4 flex justify-between font-bold text-mx-espresso">
                  <span>Total</span>
                  <span>{order.total.toFixed(2)} {order.currency}</span>
                </div>
                <div className="flex space-x-2">
                  {order.status === 'created' && (
                    <Button className="w-full" onClick={() => handleAction(order.id, 'accept')}>
                      Accept Order
                    </Button>
                  )}
                  {order.status === 'accepted' && (
                    <Button className="w-full" variant="secondary" onClick={() => handleAction(order.id, 'pay')}>
                      Mark Paid
                    </Button>
                  )}
                  {order.status === 'awaiting_payment' && (
                    <Button className="w-full" variant="primary" onClick={() => handleAction(order.id, 'close')}>
                      Close Table
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
