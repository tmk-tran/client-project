// Function to format phone number
export function formatPhoneNumber(phoneNumber) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return "Invalid phone number";
}

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

// Variables for List style in OrgContactDetails
export const listItemStyle = {
  textAlign: "center",
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

// Style for Icon colors in OrgContactDetails
export const styleIconColor = { color: "#273b91" };

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


// Center style for table cells in OrgContactDetails component
export const centerStyle = {
  textAlign: "center"
};