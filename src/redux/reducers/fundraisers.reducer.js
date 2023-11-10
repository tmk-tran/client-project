const fundraisersReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_FUNDRAISERS":
            return action.payload
        default:
            return state;
    }
}

export default fundraisersReducer;