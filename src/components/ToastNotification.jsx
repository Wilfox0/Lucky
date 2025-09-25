import { toast } from "react-toastify";

const ToastNotification = {
  addToCart: (name, qty) => {
    toast.success(`تم إضافة ${qty} × ${name} إلى السلة`);
  },

  quantityUpdated: (name, qty) => {
    toast.info(`تم تحديث الكمية: ${qty} × ${name}`);
  },

  outOfStock: (name, maxQty) => {
    toast.error(
      maxQty === 0
        ? `${name} نفدت الكمية`
        : `لا يمكن زيادة ${name} أكثر من الكمية المتاحة (${maxQty})`
    );
  },

  cartCleared: () => {
    toast.info("تم تفريغ السلة");
  },

  orderConfirmed: () => {
    toast.success("تم تأكيد الطلب بنجاح");
  },
};

export default ToastNotification;
