import React from "react";
import { useCartStore } from "../store/cartStore";

const CartItem = ({ item }) => {
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const remove = useCartStore((state) => state.removeFromCart);

  return (
    <div className="flex items-center justify-between p-4 border rounded mb-2">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <img
          src={item.image || item.images?.[0]}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-bold">{item.name}</h3>
          <p className="text-gray-600">{item.price} ج.م</p>
          {item.color && <p className="text-sm">اللون: {item.color}</p>}
          {item.size && <p className="text-sm">المقاس: {item.size}</p>}
        </div>
      </div>

      {/* التحكم بالكمية */}
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <button
          onClick={() => decrease(item.id)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => increase(item.id)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <button
        onClick={() => remove(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        إزالة
      </button>
    </div>
  );
};

export default CartItem;
