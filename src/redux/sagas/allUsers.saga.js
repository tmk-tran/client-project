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

function* editAdminStatus(action){
    try {
        const response = yield axios.put("api/allUsers", action.payload);
        console.log("EDIT ADMIN STATUS");
        yield put ({type: "FETCH_ALL_USERS"});
    } catch (err){
        console.log("error in editing admin status", err);
    }

}

export default function* allUsersSaga() {
    yield takeEvery("FETCH_ALL_USERS", fetchAllUsers);
    yield takeEvery("EDIT_ADMIN_STATUS", editAdminStatus);

}