import { toast } from "react-toastify";

const notify = {
  added: (name) => toast.success(`${name} تمت إضافته للسلة`),
  removed: (name) => toast.info(`${name} تم حذفه من السلة`),
  cleared: () => toast.warn("تم إفراغ السلة بالكامل"),
  quantityUpdated: (name, qty) =>
    toast.info(`تم تحديث ${name} إلى ${qty} قطع`),
  outOfStockLimit: (name, stock) =>
    toast.error(`${name} أقصى كمية ممكنة ${stock}`),
};

export default notify;
