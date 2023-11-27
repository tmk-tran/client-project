const orgFundraisersReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_ORG_FUNDRAISERS":
            return action.payload
        default:
            return state;
    }
}

export default orgFundraisersReducer;