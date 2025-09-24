import { toast } from "react-toastify";

const notify = {
  addToCart: (name) => toast.success(`${name} تمت إضافته للسلة`),
  quantityUpdated: (name, qty) =>
    toast.info(`${name} الكمية الجديدة: ${qty}`),
  outOfStock: (name) => toast.error(`${name} غير متاح حالياً`),
  cartCleared: () => toast.info("تم إفراغ السلة"),
  orderConfirmed: () => toast.success("تم تأكيد الطلب بنجاح 🎉"),
};

export default notify;
