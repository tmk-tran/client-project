const orgDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ORG_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

export default orgDetailsReducer;
