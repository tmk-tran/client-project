import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* merchantDetails(action) {
  try {
    const items = yield axios.get(`/api/merchants/${action.payload}`);
    console.log("FETCH request from merchants.saga, ITEMS = ", items);
    yield put({ type: "SET_MERCHANT_DETAILS", payload: items.data });
  } catch (error) {
    console.log("Error in merchantsSaga", error);
    yield put({ type: "SET_ERROR", payload: error.message });
  }
}

function* allMerchants() {
  try {
    const items = yield axios.get("/api/merchants");
    console.log("FETCH request from merchants.saga, ITEMS = ", items);
    yield put({ type: "SET_MERCHANTS", payload: items.data });
  } catch (error) {
    console.log("Error in merchantsSaga", error);
    yield put({ type: "SET_ERROR", payload: error.message });
  }
}

function* addMerchantSaga(action) {
  try {
    console.log(action.payload);
    yield axios.post("/api/merchants", action.payload);
    yield put({ type: "FETCH_MERCHANTS" });
  } catch (error) {
    console.log("error in addMerchantSaga", error);
  }
}

function* editMerchant(action) {
  try {
    const items = yield axios.put(
      `/api/merchants/${action.payload.id}`,
      action.payload
    );
    console.log(
      "FETCH request from merchants.saga, ITEMS FOR editContact = ",
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

function* deleteMerchantSaga(action) {
  const merchantId = action.payload.dataId;
  const archiveReason = action.payload.archiveReason;
  console.log(merchantId);
  console.log(archiveReason);

  try {
    yield axios.delete(`/api/merchants/${merchantId}`, {
      data: { archiveReason },
    });
    yield put({ type: "FETCH_MERCHANTS" });
  } catch (error) {
    console.log("error with deleteMerchantSaga request", error);
  }
}

export default function* merchantDetailsSaga() {
  yield takeEvery("FETCH_MERCHANT_DETAILS", merchantDetails);
  yield takeEvery("FETCH_MERCHANTS", allMerchants);
  yield takeEvery("ADD_MERCHANT", addMerchantSaga);
  yield takeEvery("EDIT_MERCHANT_DETAILS", editMerchant);
  yield takeEvery("DELETE_MERCHANT", deleteMerchantSaga);
}
