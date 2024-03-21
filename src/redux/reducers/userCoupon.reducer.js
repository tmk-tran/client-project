const userCouponReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_COUPON_LIST":
      return action.payload;
    default:
      return state;
  }
};

export default userCouponReducer;
