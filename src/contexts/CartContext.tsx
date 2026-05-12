import { createContext, useContext, useState, useMemo } from 'react';

export interface CartItem {
  id: string; // usually menuItemId + note hash
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  note?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    setItems((prev) => {
      // Check if item with same id and note exists
      const existingIdx = prev.findIndex(i => i.menuItemId === newItem.menuItemId && i.note === newItem.note);
      if (existingIdx >= 0) {
        const next = [...prev];
        const existingItem = next[existingIdx];
        if (existingItem) {
           existingItem.quantity += newItem.quantity;
        }
        return next;
      }
      return [...prev, { ...newItem, id: `${newItem.menuItemId}-${Date.now()}` }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(i => {
      if (i.id === id) {
        const nextQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: nextQty };
      }
      return i;
    }));
  };

  const clearCart = () => setItems([]);

  const total = useMemo(() => items.reduce((sum, item) => sum + (item.price * item.quantity), 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
