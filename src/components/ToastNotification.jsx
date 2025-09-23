// src/components/ToastNotification.jsx
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = {
  addToCart: (name, qty) =>
    toast.success(`✅ تمت إضافة "${name}" إلى السلة (الكمية: ${qty})`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    }),

  outOfStock: (name, available) =>
    toast.error(
      available === 0
        ? `⚠️ المنتج "${name}" غير متوفر حالياً`
        : `⚠️ المنتج "${name}" الكمية المتاحة: ${available}`,
      { position: "top-right", autoClose: 3000, theme: "colored" }
    ),

  quantityUpdated: (name, qty) =>
    toast.info(`ℹ️ تم تحديث كمية "${name}" إلى ${qty}`, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    }),

  cartCleared: () =>
    toast.info("🗑 تم تفريغ السلة", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    }),

  orderConfirmed: () =>
    toast.success("✅ تم تأكيد الطلب بنجاح", {
      position: "top-right",
      autoClose: 2500,
      theme: "colored",
    }),
};

export default notify; // ✅ Export default فقط لحل مشكلة الاستدعاء
