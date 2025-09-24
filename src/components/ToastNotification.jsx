import { toast } from "react-toastify";

const notify = {
  added: (name) => toast.success(`${name} تمت إضافته للسلة`),
  removed: (name) => toast.info(`${name} تم حذفه من السلة`),
  cleared: () => toast.warn("تم إفراغ السلة بالكامل"),
  quantityUpdated: (name, qty) =>
    toast.info(`تم تحديث ${name} إلى ${qty} قطع`),
  outOfStock: (name) =>
    toast.error(`${name} غير متوفر حالياً بالمخزون`),
  outOfStockLimit: (name, stock) =>
    toast.error(`${name} أقصى كمية ممكنة ${stock}`), // ✅ هنا أضفت الرسالة اللي انت محتاجها
  orderConfirmed: () => toast.success("تم تأكيد طلبك بنجاح 🎉"),
};

export default notify;
