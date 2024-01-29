const merchantCommentsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MERCHANT_COMMENTS":
      return action.payload;
    default:
      return state;
  }
};

export default merchantCommentsReducer;
