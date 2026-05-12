import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../../components/ui/Button';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { orderClientService } from '../../lib/services/orderClientService';
import { useToast } from '../../contexts/ToastContext';
import { restaurantService } from '../../lib/services/restaurantService';
import { LoadingScreen } from '../../components/ui/LoadingScreen';

export default function TableOrderPage() {
  const { slug, tableId } = useParams<{ slug: string, tableId: string }>();
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const { error } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerNote, setCustomerNote] = useState('');

  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  useEffect(() => {
    async function loadRestaurant() {
      if (!slug) return;
      try {
        const rest = await restaurantService.getRestaurantBySlug(slug);
        if (rest) {
          setRestaurantId(rest.id);
        } else {
          error("Restaurant not found");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadRestaurant();
  }, [slug, error]);

  const handleSubmit = async () => {
    if (items.length === 0) {
      error("Your cart is empty");
      return;
    }
    if (!restaurantId || !tableId) {
      error("Invalid restaurant or table");
      return;
    }

    setIsSubmitting(true);
    try {
      await orderClientService.createOrder({
        restaurantId,
        tableId,
        tableLabel: tableId, // Use raw tableId until a real table read exists
        items: items.map(i => ({
          menuItemId: i.menuItemId,
          name: i.name,
          quantity: i.quantity,
          unitPrice: i.price,
          notes: i.note
        })),
        customerNote,
        total,
        currency: 'TND',
        createdBy: 'customer'
      });

      clearCart();
      navigate('/order/sent');
    } catch (err) {
      console.error(err);
      error("Failed to submit order");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-mx-bg pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-mx-border bg-mx-surface px-4 py-4 shadow-sm">
         <h1 className="font-display text-xl font-semibold text-mx-espresso">Your Order</h1>
         <div className="rounded-md bg-mx-soft px-3 py-1 text-sm font-medium text-mx-accent">Table {tableId}</div>
      </div>

      <div className="p-4">
        {items.length === 0 ? (
          <div className="mt-20 flex flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-mx-soft p-4">
              <ShoppingBag className="h-8 w-8 text-mx-muted" />
            </div>
            <h3 className="text-lg font-medium text-mx-espresso">Your cart is empty</h3>
            <p className="mt-2 text-sm text-mx-muted">Browse the menu to add items.</p>
            <Button className="mt-6" onClick={() => navigate(`/r/${slug}`)}>View Menu</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-start justify-between rounded-xl border border-mx-border bg-mx-surface p-4 shadow-sm">
                  <div className="flex-1 pr-4">
                    <h4 className="font-medium text-mx-espresso">{item.name}</h4>
                    <div className="mt-1 text-sm text-mx-accent">{(item.price * item.quantity).toFixed(2)} TND</div>
                    {item.note && <div className="mt-2 text-xs italic text-mx-muted">Note: {item.note}</div>}
                  </div>
                  <div className="flex flex-col items-end space-y-3">
                    <button onClick={() => removeItem(item.id)} className="text-mx-muted hover:text-mx-danger">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center space-x-3 rounded-lg border border-mx-border p-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-mx-muted hover:text-mx-espresso">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-mx-muted hover:text-mx-espresso">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <div>
              <label className="mb-2 block text-sm font-medium text-mx-espresso">Add a note for the kitchen</label>
              <textarea
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                className="w-full rounded-lg border border-mx-border bg-mx-surface p-3 text-sm focus:border-mx-accent focus:outline-none focus:ring-1 focus:ring-mx-accent"
                rows={2}
                placeholder="Any special requests?"
              />
            </div>

            {/* Total */}
            <div className="rounded-xl bg-mx-espresso p-4 text-white">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{total.toFixed(2)} TND</span>
              </div>
            </div>

            {/* Submit */}
            <Button
              className="w-full"
              size="lg"
              onClick={handleSubmit}
              isLoading={isSubmitting}
            >
              Send to Kitchen
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
