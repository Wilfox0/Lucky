import React from "react";
import { useCartStore } from "../store/cartStore";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cartItems, clearCart, increase, decrease, removeFromCart, confirmOrder } = useCartStore();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">سلة التسوق</h1>
      {cartItems.length === 0 ? (
        <p>سلتك فارغة</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                increase={() => increase(item.id)}
                decrease={() => decrease(item.id)}
                remove={() => removeFromCart(item.id)}
              />
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">الإجمالي: {totalPrice} جنيه</p>
            <div className="space-x-2">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                تفريغ السلة
              </button>
              <button
                onClick={confirmOrder}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                تأكيد الطلب
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
