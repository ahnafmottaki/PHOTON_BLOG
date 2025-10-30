import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";
const HotToast = () => {
  const toastModal = document.getElementById("modal-toast")!;
  return createPortal(<Toaster />, toastModal);
};

export default HotToast;
