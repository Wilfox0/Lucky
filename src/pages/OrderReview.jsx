import React, { useState } from "react";
import { useCartStore } from "../store/cartStore";

const shippingPrices = {
  "القاهرة": 30,
  "الجيزة": 35,
  "الإسكندرية": 40,
};

export default function OrderReview() {
  const { cartItems, clearCart } = useCartStore();
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", city: "القاهرة" });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingPrices[customer.city] || 0;
  const total = subtotal + shipping;

  const handleConfirm = () => {
    alert("✅ تم تأكيد الطلب!\nسيتم التواصل معك هاتفياً");
    clearCart();
  };

  if (cartItems.length === 0) {
    return <p className="text-center text-gray-600">لا توجد منتجات في السلة</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">مراجعة الطلب</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="border-b py-2">
          {item.name} ({item.size}/{item.color}) × {item.quantity} = {item.price * item.quantity} ج.م
        </div>
      ))}

      <div className="space-y-2">
        <input
          type="text"
          placeholder="الاسم"
          className="border rounded p-2 w-full"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="رقم التليفون"
          className="border rounded p-2 w-full"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="العنوان"
          className="border rounded p-2 w-full"
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
        />
        <select
          className="border rounded p-2 w-full"
          value={customer.city}
          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
        >
          {Object.keys(shippingPrices).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="border-t pt-2">
        <p>إجمالي المنتجات: {subtotal} ج.م</p>
        <p>الشحن: {shipping} ج.م</p>
        <p className="font-bold">الإجمالي: {total} ج.م</p>
      </div>

      <button
        onClick={handleConfirm}
        className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
      >
        تأكيد الطلب
      </button>
    </div>
  );
}
