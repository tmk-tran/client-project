import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* merchantDetails(action) {
  try {
    const items = yield axios.get(`/api/merchants/${action.payload}`);
    console.log("FETCH request from merchantDetails.saga, ITEMS = ", items);
    yield put({ type: "SET_MERCHANT_DETAILS", payload: items.data });
  } catch (error) {
    console.log("Error in merchantDetailsSaga", error);
    yield put({ type: "SET_ERROR", payload: error.message });
  }
}

function* allMerchants(action) {
  try {
    const items = yield axios.get("/api/merchants");
    console.log("FETCH request from merchantDetails.saga, ITEMS = ", items);
    yield put({ type: "SET_MERCHANTS", payload: items.data });
  } catch (error) {
    console.log("Error in merchantDetailsSaga", error);
    yield put({ type: "SET_ERROR", payload: error.message });
  }
}

function* editMerchant(action) {
  try {
    const items = yield axios.put(
      `/api/merchants/${action.payload.id}`,
      action.payload
    );
    console.log(
      "FETCH request from merchantDetails.saga, ITEMS FOR editContact = ",
      items
    );
    console.log("EDIT_CONTACT_INFO action.payload = ", action.payload);

    yield put({
      type: "FETCH_MERCHANT_DETAILS",
      payload: action.payload.id,
    });
  } catch {
    console.log("error in editMerchantSaga");
  }
}

export default function* merchantDetailsSaga() {
  yield takeEvery("FETCH_MERCHANT_DETAILS", merchantDetails);
  yield takeEvery("FETCH_MERCHANTS", allMerchants);
  yield takeEvery("EDIT_MERCHANT_DETAILS", editMerchant);
}
