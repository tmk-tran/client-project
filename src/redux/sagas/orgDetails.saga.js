import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* orgDetails(action) {
  try {
    const items = yield axios.get(`/api/orgDetails/${action.payload}`);
    console.log("FETCH request from orgDetails.saga, ITEMS = ", items);
    yield put({ type: "SET_ORG_DETAILS", payload: items.data });
  } catch {
    console.log("error in orgDetailsSaga");
  }
}

export default function* orgDetailsSaga() {
  yield takeEvery("FETCH_ORG_DETAILS", orgDetails);
}
