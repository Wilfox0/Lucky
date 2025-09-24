import { toast } from "react-toastify";

const notify = {
  addToCart: (name, qty = 1) => toast.success(`${name} تمت إضافته للسلة (${qty})`),
  removed: (name) => toast.info(`${name} تم حذفه من السلة`),
  cartCleared: () => toast.warn("تم إفراغ السلة بالكامل"),
  quantityUpdated: (name, qty) => toast.info(`تم تحديث ${name} إلى ${qty} قطعة`),
  outOfStock: (name, stock) => toast.error(`${name} أقصى كمية ممكنة ${stock}`),
  orderConfirmed: () => toast.success("تم تأكيد الطلب بنجاح!"),
};

export default notify;
