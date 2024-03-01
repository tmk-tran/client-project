const couponReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_COUPON_FILES":
      return action.payload;
    default:
      return state;
  }
};

export default couponReducer;
