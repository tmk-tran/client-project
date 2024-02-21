const sellerPageReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SELLER_PAGEINFO":
      return action.payload;
    default:
      return state;
  }
};

export default sellerPageReducer;
