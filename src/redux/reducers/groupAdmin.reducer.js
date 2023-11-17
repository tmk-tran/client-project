const groupAdminReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_GROUP_ADMIN":
            return action.payload
        default:
            return state;
    }
}

export default groupAdminReducer;