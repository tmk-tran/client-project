import Swal from "sweetalert2";

// Sweet Alert in OrgDetails
export const showDeleteSweetAlert = (deleteCall) => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Execute the callback if the user confirms
      deleteCall && deleteCall();
      Swal.fire("Deleted!");
    }
  });
};

// Sweet Alert in OrgContactDetailsEdit
export const showSaveSweetAlert = (saveCall) => {
  saveCall && saveCall();
  Swal.fire("Saved!");
};
