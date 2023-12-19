const merchantReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MERCHANT_FILES":
      return action.payload;
    default:
      return state;
  }
};

export default merchantReducer;

// // reducer.js
// const initialState = {
//     files: [],
//     error: null,
//   };
  
//   const merchantReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SET_MERCHANT_FILES':
//         return {
//           ...state,
//           files: action.payload,
//           error: null,
//         };
//       case 'FETCH_MERCHANT_FILES_FAILURE':
//         return {
//           ...state,
//           error: action.payload,
//         };
//       // Add other reducer cases as needed
//       default:
//         return state;
//     }
//   };
  
//   export default merchantReducer;
  