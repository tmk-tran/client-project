const locationsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_LOCATIONS":
      return action.payload;
    default:
      return state;
  }
};

export default locationsReducer;
