import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchAllUsers() {
    try {
        const response = yield axios.get("/api/allUsers");
        console.log("FETCH request fetchAllUsers");
        yield put({ type: "SET_ALL_USERS", payload: response.data });
    } catch (err) {
        console.log("error in fetching coupon books", err);
    }
}


export default function* allUsersSaga() {
    yield takeEvery("FETCH_ALL_USERS", fetchAllUsers);

}