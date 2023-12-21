// const initialState = {
//   uploading: false,
//   error: null,
// };

// const pdfReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "UPLOAD_PDF_REQUEST":
//       return {
//         ...state,
//         uploading: true,
//         error: null,
//       };
//     case "UPLOAD_PDF_SUCCESS":
//       return {
//         ...state,
//         uploading: false,
//         error: null,
//       };
//     case "UPLOAD_PDF_FAILURE":
//       return {
//         ...state,
//         uploading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

const pdfReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_PDF":
      return action.payload;
    default:
      return state;
  }
};

// const pdfReducer = (state = [], action) => {
//   switch (action.type) {
//     case "GET_PDF":
//       return [...state, action.payload]; // Append the new PDF blob to the existing array
//     default:
//       return state;
//   }
// };

export default pdfReducer;
