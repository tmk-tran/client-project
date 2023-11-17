//Reducer used to set state of group details with fundraiser data
const groupDetailsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_GROUP_DETAILS":
            return action.payload
        default:
            return state;
    }
}
//Exports reducer for use in root reducer
export default groupDetailsReducer;