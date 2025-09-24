import { create } from "zustand";
import { toast } from "react-hot-toast";

const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product, selectedColor, selectedSize, quantity = 1) => {
    const cart = get().cart;
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.color === selectedColor &&
        item.size === selectedSize
    );

    if (existingItemIndex >= 0) {
      const existingItem = cart[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > product.quantity) {
        toast.error(`الحد الأقصى المتاح هو ${product.quantity} قطعة فقط`);
        return;
      }

      const updatedItem = { ...existingItem, quantity: newQuantity };
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = updatedItem;

      set({ cart: updatedCart });
      toast.success("تم تحديث الكمية في السلة");
    } else {
      if (quantity > product.quantity) {
        toast.error(`الحد الأقصى المتاح هو ${product.quantity} قطعة فقط`);
        return;
      }

      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        color: selectedColor,
        size: selectedSize,
        quantity,
      };

      set({ cart: [...cart, newItem] });
      toast.success("تمت إضافة المنتج إلى السلة");
    }
  },

  removeFromCart: (id, color, size) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.id === id && item.color === color && item.size === size)
      ),
    })),

  clearCart: () => {
    set({ cart: [] });
    toast.success("تم إفراغ السلة");
  },
}));

export default useCartStore;
