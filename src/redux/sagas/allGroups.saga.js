import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchAllGroupsSaga() {
    try {
      const response = yield axios.post("/api/allGroups");
      console.log("FETCH request fetchAllGroupsSaga");
      yield put({ type: "SET_ALL_GROUPS", payload: response.data });
    } catch {
      console.log("error in fetchAllGroupsSaga");
    }
  }



  export default function* allGroupsSaga() {
    yield takeEvery("FETCH_ALL_GROUPS", fetchAllGroupsSaga);
  }