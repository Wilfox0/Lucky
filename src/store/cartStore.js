import { create } from "zustand";
import notify from "../components/ToastNotification";

const useCartStore = create((set) => ({
  items: [],

  add: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity < product.stock) {
          existing.quantity += 1;
          notify.quantityUpdated(product.name, existing.quantity);
        } else {
          notify.outOfStockLimit(product.name, product.stock);
        }
      } else {
        state.items.push({ ...product, quantity: 1 });
        notify.added(product.name);
      }
      return { items: [...state.items] };
    }),

  increase: (id) =>
    set((state) => {
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (item.quantity < item.stock) {
          item.quantity += 1;
          notify.quantityUpdated(item.name, item.quantity);
        } else {
          notify.outOfStockLimit(item.name, item.stock);
        }
      }
      return { items: [...state.items] };
    }),

  decrease: (id) =>
    set((state) => {
      const item = state.items.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        notify.quantityUpdated(item.name, item.quantity);
      }
      return { items: [...state.items] };
    }),

  remove: (id) =>
    set((state) => {
      const item = state.items.find((item) => item.id === id);
      if (item) notify.removed(item.name);
      return { items: state.items.filter((item) => item.id !== id) };
    }),

  clear: () =>
    set((state) => {
      if (state.items.length > 0) notify.cleared();
      return { items: [] };
    }),
}));

export default useCartStore;
