const sellersReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SELLERS":
      return action.payload;
    default:
      return state;
  }
};

export default sellersReducer;
