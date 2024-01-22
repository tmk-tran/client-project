const merchantNotesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_MERCHANT_NOTES":
      return action.payload;
    default:
      return state;
  }
};

export default merchantNotesReducer;
