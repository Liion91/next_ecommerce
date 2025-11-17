import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

// persist -> local Storage
// set -> zustand -> manage the state
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      // initial state
      items: [],
      addItem: (newItem: CartItem) =>
        set((state) => {
          // il prodotto già esiste nel carrello?
          const existing = state.items.find((i) => i.id === newItem.id);
          if (existing) {
            // se esiste, aumentiamo la quantity
            return {
              items: state.items.map((item) =>
                item.id === newItem.id
                  ? {
                      ...item,
                      quantity: item.quantity + newItem.quantity,
                    }
                  : item
              ),
            };
          }

          // aggiungiamo il nuovo item
          return {
            items: [...state.items, newItem],
          };
        }),
      removeItem: (id: string) =>
        set((state) => {
            return {
              items: state.items.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      quantity: item.quantity - 1,
                    }
                  : item
                  // se la quantity arriva a 0, rimuoviamo l'item
              ).filter((item) => item.quantity > 0),
            };
        }),
      clearCart: () => set({ items: [] }),
    }),
    // il nome della chiave nel local storage
    { name: "cart-store" }
  )
);
