import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchGroupAdminSaga() {
    try {
      const response = yield axios.get(`/api/groupAdmin`);
      console.log("FETCH request fetchGroupAdminSaga");
      yield put({ type: "SET_GROUP_ADMIN", payload: response.data });
    } catch {
      console.log("error in fetchGroupAdminSaga");
    }
  }



  export default function* groupAdminSaga() {
    yield takeEvery("FETCH_GROUP_ADMIN", fetchGroupAdminSaga);
  }