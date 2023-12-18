const merchantReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MERCHANT_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

export default merchantReducer;
