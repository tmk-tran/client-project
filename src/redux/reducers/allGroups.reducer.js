const allGroupsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_ALL_GROUPS":
            return action.payload
        default:
            return state;
    }
}

export default allGroupsReducer;