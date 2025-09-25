import { create } from "zustand";
import notify from "../components/ToastNotification"; // ✅ تم تعديل الاستيراد فقط

export const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product) => {
    const state = get();
    const existing = state.cartItems.find((item) => item.id === product.id);

    if (product.quantity <= 0) {
      notify.outOfStock(product.name, 0);
      return;
    }

    if (existing) {
      if (existing.quantity + 1 > product.quantity) {
        notify.outOfStock(product.name, product.quantity);
        return;
      }
      set({
        cartItems: state.cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
      notify.quantityUpdated(product.name, existing.quantity + 1);
    } else {
      set({
        cartItems: [...state.cartItems, { ...product, quantity: 1, maxQuantity: product.quantity }],
      });
      notify.addToCart(product.name, 1);
    }
  },

  removeFromCart: (id) => {
    const state = get();
    const item = state.cartItems.find((i) => i.id === id);
    if (item) notify.quantityUpdated(item.name, 0);
    set({ cartItems: state.cartItems.filter((item) => item.id !== id) });
  },

  clearCart: () => {
    set({ cartItems: [] });
    notify.cartCleared();
  },

  increase: (id) => {
    const state = get();
    const item = state.cartItems.find((i) => i.id === id);
    if (!item) return;
    if (item.quantity + 1 > item.maxQuantity) {
      notify.outOfStock(item.name, item.maxQuantity);
      return;
    }
    set({
      cartItems: state.cartItems.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    });
    notify.quantityUpdated(item.name, item.quantity + 1);
  },

  decrease: (id) => {
    const state = get();
    const item = state.cartItems.find((i) => i.id === id);
    if (!item) return;
    const newQty = item.quantity - 1;
    set({
      cartItems: state.cartItems
        .map((i) => (i.id === id ? { ...i, quantity: newQty } : i))
        .filter((i) => i.quantity > 0),
    });
    if (newQty > 0) notify.quantityUpdated(item.name, newQty);
    else notify.quantityUpdated(item.name, 0);
  },

  confirmOrder: () => {
    set({ cartItems: [] });
    notify.orderConfirmed();
  },
}));
