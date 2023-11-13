const orgGroupsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_ORG_GROUPS":
            return action.payload
        default:
            return state;
    }
}

export default orgGroupsReducer;