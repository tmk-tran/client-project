import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchGroupSaga(action) {
    try {
        console.log(action.payload)
        const response = yield axios.get(`/api/group/${action.payload}`)
        yield put ({ type: "SET_GROUP_DETAILS", payload: response.data})
    } catch (error) {
        console.log("Error fetching group details", err)
    }
}



export default function* groupSaga(){
    yield takeEvery("FETCH_GROUP_DETAILS", fetchGroupSaga)
}