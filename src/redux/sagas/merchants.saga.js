import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* allMerchants(action) {
  try {
    const items = yield axios.get("/api/merchants");
    console.log("FETCH request from allMerchants.saga, ITEMS = ", items);
    yield put({ type: "SET_MERCHANTS", payload: items.data });
  } catch (error) {
    console.log("Error in allMerchantsSaga", error);
    yield put({ type: "SET_ERROR", payload: error.message });
  }
}

export default function* allMerchantsSaga() {
  yield takeEvery("FETCH_ALL_MERCHANTS", allMerchants);
}
