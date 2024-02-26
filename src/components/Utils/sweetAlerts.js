import Swal from "sweetalert2";
import { primaryColor, successColor } from "./colors";

export const showDeleteSweetAlert = (deleteCall) => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: successColor.color,
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Execute the callback if the user confirms
      deleteCall && deleteCall();
      Swal.fire({
        title: "Deleted!",
        icon: "success",
        confirmButtonColor: primaryColor.color,
      });
    }
  });
};

// Sweet Alert in OrgContactDetailsEdit
export const showSaveSweetAlert = (saveCall) => {
  saveCall && saveCall();
  Swal.fire({
    title: "Saved!",
    icon: "success",
    confirmButtonColor: primaryColor.color,
  });
};

// Sweet Alert for RequestBooks.jsx
export const requestBooksSweetAlert = (saveCall) => {
  console.log(saveCall);
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: successColor.color,
    cancelButtonColor: "#d33",
    confirmButtonText: "Request Books",
  }).then((result) => {
    if (result.isConfirmed) {
      // Execute the callback if the user confirms
      saveCall && saveCall();
      Swal.fire({
        title: "Books Requested!",
        icon: "success",
        confirmButtonColor: primaryColor.color,
      });
    }
  });
};
