const couponReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_COUPON_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

export default couponReducer;
