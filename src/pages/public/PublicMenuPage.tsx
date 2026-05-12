import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingScreen } from '../../components/ui/LoadingScreen';
import { restaurantService } from '../../lib/services/restaurantService';
import { menuService } from '../../lib/services/menuService';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../contexts/ToastContext';
import type { Restaurant } from '../../lib/types/restaurant';
import type { MenuItem } from '../../lib/types/menu';

export default function PublicMenuPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, total, items } = useCart();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Since we don't know the table from the generic menu route,
  // we assume the user accesses the menu via the table route usually,
  // but if they don't, we can let them browse, and ask for a table when checking out.
  // For the vertical slice, we'll navigate to a stub table "t1".

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      setLoading(true);
      setError(null);

      try {
        const rest = await restaurantService.getRestaurantBySlug(slug);
        if (!rest) {
          setError("Restaurant not found");
          setLoading(false);
          return;
        }

        setRestaurant(rest);

        const itemsList = await menuService.getMenuItems(rest.id);
        setMenuItems(itemsList);
      } catch (err) {
        console.error("Failed to load menu data", err);
        setError("Failed to load menu data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) return <LoadingScreen />;
  if (error || !restaurant) return <div className="flex h-screen items-center justify-center p-4 text-center text-mx-danger">{error || "Restaurant not found"}</div>;

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      menuItemId: item.id,
      name: item.name.fr || item.name.en || item.name.ar || "Unknown Item",
      price: item.price,
      quantity: 1
    });
    toast(`Added ${item.name.fr || "Item"} to cart`, "success");
  };

  return (
    <div className="min-h-screen bg-mx-bg pb-32 relative">
      {/* Header */}
      <div
        className="relative flex h-48 w-full items-end justify-center bg-mx-espresso pb-6"
        style={{ backgroundColor: restaurant.branding?.primaryColor || 'var(--mx-espresso)' }}
      >
        <div className="absolute -bottom-10 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-mx-bg bg-white shadow-md">
            <span className="font-display text-xl font-bold text-mx-espresso">{restaurant.name.charAt(0).toUpperCase()}</span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-14 px-4 text-center">
        <h1 className="font-display text-3xl font-bold text-mx-espresso">{restaurant.name}</h1>
        <p className="mt-2 text-mx-muted">{restaurant.description}</p>
      </div>

      {/* Items */}
      <div className="mt-8 space-y-4 px-4">
        {menuItems.length === 0 ? (
          <div className="py-8 text-center text-mx-muted">No items available.</div>
        ) : (
          menuItems.map(item => (
            <div key={item.id} className="flex overflow-hidden rounded-xl border border-mx-border bg-mx-surface shadow-sm">
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="font-semibold text-mx-espresso">{item.name.fr || item.name.en || item.name.ar}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-mx-muted">{item.description?.fr || item.description?.en || item.description?.ar}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                   <span className="font-medium text-mx-accent">{item.price.toFixed(2)} TND</span>
                   <Button size="sm" onClick={() => handleAddToCart(item)}>Add</Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Branding */}
      <div className="mt-12 pb-8 text-center text-xs text-mx-muted">
        Powered by <span className="font-semibold">MenuxPro</span>
      </div>

      {/* Floating Cart Widget */}
      {items.length > 0 && (
         <div className="fixed bottom-6 left-0 right-0 px-4">
           <Button
             className="w-full shadow-lg h-14 justify-between px-6"
             onClick={() => navigate(`/r/${slug}/t/t1`)} // Hardcoded table 1 for public generic entry
           >
             <span className="bg-white/20 rounded-md px-2 py-1 text-sm">{items.length}</span>
             <span>View Cart</span>
             <span>{total.toFixed(2)} TND</span>
           </Button>
         </div>
      )}
    </div>
  );
}
