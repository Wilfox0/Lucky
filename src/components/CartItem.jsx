import React from "react";
import { useCartStore } from "../store/cartStore";

export default function CartItem({ item }) {
  const { increase, decrease, removeFromCart } = useCartStore();

  return (
    <div className="flex items-center justify-between border-b py-2">
      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
      <div className="flex-1 px-4">
        <h3 className="font-semibold">{item.name}</h3>
        <p>المقاس: {item.size} | اللون: {item.color}</p>
        <p className="text-pink-700 font-bold">{item.price} ج.م</p>
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={() => decrease(item.id)} className="px-2 bg-pink-200 rounded">-</button>
        <span>{item.quantity}</span>
        <button onClick={() => increase(item.id)} className="px-2 bg-pink-200 rounded">+</button>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 ml-2"
        >
          ❌
        </button>
      </div>
    </div>
  );
}
