import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import notify from "../components/ToastNotification"; // ✅ تم تعديل الاستيراد فقط

export default function Cart() {
  const { cartItems, increase, decrease, removeFromCart, clearCart } = useCartStore();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleClearCart = () => {
    clearCart();
    notify.cartCleared(); // استخدام Notify بشكل صحيح
  };

  if (cartItems.length === 0) {
    return <p className="text-center text-gray-600 mt-10">السلة فارغة 🛒</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🛍️ السلة</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
              )}
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.price} ج.م</p>
                {item.size && <p className="text-sm">المقاس: {item.size}</p>}
                {item.color && <p className="text-sm">اللون: {item.color}</p>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decrease(item.id)}
                className="bg-pink-500 text-white px-2 py-1 rounded hover:bg-pink-600"
              >
                -
              </button>
              <span className="px-2">{item.quantity}</span>
              <button
                onClick={() => increase(item.id)}
                className="bg-pink-500 text-white px-2 py-1 rounded hover:bg-pink-600"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
              >
                🗑️ حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 p-4 border-t">
        <h3 className="text-xl font-bold">الإجمالي: {total} ج.م</h3>

        <div className="flex gap-3">
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            تفريغ السلة 🗑️
          </button>

          <Link
            to="/review"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            تأكيد الطلب ✅
          </Link>
        </div>
      </div>
    </div>
  );
}
