const orgNotesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ORG_NOTES":
      return action.payload;
    default:
      return state;
  }
};

export default orgNotesReducer;