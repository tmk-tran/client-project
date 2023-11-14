const couponBookReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_COUPON_BOOKS":
            return action.payload
        default:
            return state;
    }
}

export default couponBookReducer;