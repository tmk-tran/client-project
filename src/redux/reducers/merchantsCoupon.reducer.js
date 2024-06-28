const merchantsCouponReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_COUPON_NUMBER":
      return action.payload;
    default:
      return state;
  }
};

export default merchantsCouponReducer;
