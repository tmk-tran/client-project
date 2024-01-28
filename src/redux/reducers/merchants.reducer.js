const merchantsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MERCHANTS":
      return action.payload;
    default:
      return state;
  }
};

export default merchantsReducer;
