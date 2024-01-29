const merchantDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MERCHANT_DETAILS":
      return action.payload;
    // case "SET_MERCHANTS":
    //   return action.payload;
    case "SET_ERROR":
      // Add logic for handling SET_ERROR action
      return {
        ...state,
        error: action.payload,
      };
    // Add more cases as needed
    default:
      return state;
  }
};

export default merchantDetailsReducer;
