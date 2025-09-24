import { create } from "zustand";
import notify from "../components/ToastNotification";
import { sendTelegramMessage } from "../utils/telegram";

export const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product) => {
    const state = get();
    const existing = state.cartItems.find((item) => item.id === product.id);

    if (product.quantity <= 0) {
      notify.outOfStockLimit(product.name, 0);
      return;
    }

    if (existing) {
      if (existing.quantity + 1 > product.quantity) {
        notify.outOfStockLimit(product.name, product.quantity);
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
      notify.added(product.name);
    }
  },

  removeFromCart: (id) => {
    const state = get();
    const item = state.cartItems.find((i) => i.id === id);
    if (item) notify.removed(item.name);
    set({ cartItems: state.cartItems.filter((item) => item.id !== id) });
  },

  clearCart: () => {
    set({ cartItems: [] });
    notify.cleared();
  },

  increase: (id) => {
    const state = get();
    const item = state.cartItems.find((i) => i.id === id);
    if (!item) return;
    if (item.quantity + 1 > item.maxQuantity) {
      notify.outOfStockLimit(item.name, item.maxQuantity);
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

  confirmOrder: async (orderData) => {
    set({ cartItems: [] });
    notify.orderConfirmed();

    const message = `طلب جديد من ${orderData.customer_name}\nالهاتف: ${orderData.phone}\nالعنوان: ${orderData.address}\nالمجموع: ${orderData.total_price}`;
    await sendTelegramMessage(message);
  },
}));
