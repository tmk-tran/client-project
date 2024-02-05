const initialState = {
  pdfs: {}, // Object to store PDF blobs with coupon IDs
};

// const pdfReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "GET_PDF":
//       const { couponId, pdfBlob } = action.payload;
//       return {
//         ...state,
//         pdfs: {
//           ...state.pdfs,
//           [couponId]: pdfBlob,
//         },
//       };
//     // other cases...
//     default:
//       return state;
//   }
// };


const pdfReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_PDF":
      return action.payload;
    case "SET_COUPON_FILES":
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
