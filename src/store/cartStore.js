import { create } from "zustand";
import notify from "../components/ToastNotification";
import { supabase } from "../utils/supabase";
import { sendTelegramMessage } from "../utils/telegram";

export const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: async (product) => {
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

  confirmOrder: async (customerInfo, province) => {
    const state = get();
    if (state.cartItems.length === 0) return;

    // حفظ الأوردر في Supabase
    const { data: orderData, error } = await supabase
      .from("orders")
      .insert([{
        customer_name: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address,
        province_id: province.id,
        total_price: state.cartItems.reduce((a,b)=>a+b.price*b.quantity,0)
      }])
      .select()
      .single();

    if (!error && orderData) {
      for (const item of state.cartItems) {
        await supabase.from("order_items").insert([{
          order_id: orderData.id,
          product_id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          color: item.selectedColor || null,
          size: item.selectedSize || null,
          image: item.images[0] || null
        }]);
      }

      // إشعار تليجرام
      await sendTelegramMessage(`ورد أوردر جديد من ${customerInfo.name} بمجموع ${state.cartItems.reduce((a,b)=>a+b.price*b.quantity,0)}`);

      set({ cartItems: [] });
      notify.orderConfirmed();
    }
  },
}));
