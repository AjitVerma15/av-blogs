import { toast } from "react-toastify";

export const showToast = (toastId, message, type) => {
  toast.update(toastId, {
    render: message,
    type: type,
    isLoading: false,
    autoClose: 3000,
    closeButton: true,
  });
};
