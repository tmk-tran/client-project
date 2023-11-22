// Toasts in OrgDetailsEdit, OrgContactEdit, and AddGroupPopover (INACTIVE, MAY USE LATER)
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = () => {
  toast.success("Changes saved!", {
    position: toast.POSITION.RIGHT_CENTER,
    autoClose: 2000,
    closeButton: false,
    hideProgressBar: true,
  });
};

export const showToastDelete = () => {
  toast.error("Deleted!", {
    position: toast.POSITION.LEFT_CENTER,
    autoClose: 2000,
    closeButton: false,
    hideProgressBar: true,
  });
};