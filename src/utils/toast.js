import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Toast configuration
export const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

// Toast utility functions
export const showToast = {
  success: (message, callback) => {
    toast.success(message, toastConfig);
    if (callback) {
      setTimeout(callback, toastConfig.autoClose);
    }
  },
  error: (message, callback) => {
    toast.error(message, toastConfig);
    if (callback) {
      setTimeout(callback, toastConfig.autoClose);
    }
  },
  info: (message, callback) => {
    toast.info(message, toastConfig);
    if (callback) {
      setTimeout(callback, toastConfig.autoClose);
    }
  },
  warning: (message, callback) => {
    toast.warning(message, toastConfig);
    if (callback) {
      setTimeout(callback, toastConfig.autoClose);
    }
  },
};

// Toast container component configuration
export const ToastContainerConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
};

// Success notification
showToast.success("Operation completed successfully!");

// Error notification
showToast.error("Something went wrong!");

// Info notification
showToast.info("Please note this information.");

// Warning notification
showToast.warning("Be careful!");
