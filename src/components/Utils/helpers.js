// Function to format phone number
export function formatPhoneNumber(phoneNumber) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return "Invalid phone number";
}

// Format date to MM/DD/YYYY, used in OrgNotes component
export const formatDate = (dateString) => {
  const dateWithoutTime = dateString.split("T")[0]; // Extract only the date part
  const [year, month, day] = dateWithoutTime.split("-");
  return `${month}/${day}/${year}`;
};

// Function to capitalize the first letter of each word
export const capitalizeWords = (sentence) => {
  return sentence
    ? sentence
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    : "";
};

// In progress, trying to account for acronyms in a sentence
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// export const capitalizeWords = (sentence) => {
//   return sentence
//     ? sentence
//         .split(" ")
//         .map((word) => {
//           // Check if the word is an acronym (all uppercase and at least 2 characters)
//           if (/^[A-Z]+$/.test(word) && word.length >= 2) {
//             return word; // If it's an acronym, leave it unchanged
//           } else {
//             // Convert the word to lowercase
//             return word.toLowerCase();
//           }
//         })
//         .join(" ")
//     : "";
// };

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Style for Modal in OrgGroupInfo
export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  // height: "50vh",
  display: "flex",
  flexDirection: "column",
  // Media query for smaller screens
  "@media (max-width: 700px)": {
    height: "80vw",
    width: "90vw", // Adjust the width for smaller screens
    maxWidth: "50vw", // Adjust the maximum width for smaller screens
    maxHeight: "100vw",
  },
  "@media (max-width: 400px)": {
    height: "100vw",
  },
};

export const centeredStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const styleFlexBox = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "center",
};

// Style for images
export const styleImage = {
  width: "400px",
  height: "220px",
  objectFit: "contain",
};

// Flexbox style for buttons in modals OrgDetails component
export const modalBtnStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

// Center style for table cells, and list items in OrgContactDetails component
export const centerStyle = {
  textAlign: "center",
};

// Style for center of divs
export const centerDiv = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// Style for hr lines in Notes and Task display
export const hrStyle = {
  width: "90%",
  border: "1px solid #273b91",
};
