import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* merchantDetails(action) {
  try {
    const items = yield axios.get(`/api/merchantDetails/${action.payload}`);
    console.log("FETCH request from merchantDetails.saga, ITEMS = ", items);
    yield put({ type: "SET_MERCHANT_DETAILS", payload: items.data });
  } catch (error) {
    console.log("Error in merchantDetailsSaga", error);
    yield put({ type: "SET_ERROR", payload: error.message });
  }
}

export default function* merchantDetailsSaga() {
  yield takeEvery("FETCH_MERCHANT_DETAILS", merchantDetails);
  //   yield takeEvery("EDIT_MERCHANT_DETAILS", editMerchant);
}
