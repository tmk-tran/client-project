const archivedOrganizationsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_ARCHIVED_ORGANIZATIONS":
          return action.payload;
        default:
          return state;
      }
}

export default archivedOrganizationsReducer;