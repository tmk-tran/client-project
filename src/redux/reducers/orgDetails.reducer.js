const orgDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ORG_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

// const orgDetailsReducer = (state = [], action) => {
//   switch (action.type) {
//     case "SET_ORG_DETAILS":
//       return action.payload;
//     case "NO_GROUP_DETAILS":
//       // Handle the case where there are no groups associated with the organization
//       console.log(`No groups associated with organization ID ${action.payload}`);
//       return []; // You might want to return a specific state or an empty array
//     default:
//       return state;
//   }
// };


export default orgDetailsReducer;
