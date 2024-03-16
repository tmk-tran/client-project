import axios from "axios";
import { put, takeEvery, call } from "redux-saga/effects";

function* fetchSeller(action) {
  try {
    const items = yield axios.get(`/api/seller/${action.payload}`);
    console.log("FETCH request from sellerPage.saga, ITEMS = ", items.data);
    yield put({ type: "SET_SELLER_PAGEINFO", payload: items.data });
  } catch (error) {
    console.log("error in sellerPage Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

// function* updateSeller(action) {
//   console.log("Updating seller: ", action.payload);
//   const { id, refId } = action.payload;
//   console.log(id, refId);

//   try {
//     yield axios.put(`/api/seller/${id}`, action.payload);
//     yield put({ type: "FETCH_SELLER_PAGEINFO", payload: refId });
//   } catch (error) {
//     console.log("error in updateSeller Saga", error);
//     yield put({ type: "SET_ERROR", payload: error });
//   }
// }

// function* updateCash(action) {
//   console.log("Updating cash: ", action.payload);
//   yield call(updateSeller, action);
// }

// function* updateChecks(action) {
//   console.log("Updating checks: ", action.payload);
//   yield call(updateSeller, action);
// }

// function* updateDonations(action) {
//   console.log("Updating donations: ", action.payload);
//   yield call(updateSeller, action);
// }

// function* updateDigitalPayments(action) {
//   console.log("Updating digital payments: ", action.payload);
//   yield call(updateSeller, action);
// }


function* updateCash(action) {
  const sellerId = action.payload.id;
  console.log(sellerId);
  const refId = action.payload.refId;
  console.log(refId);

  try {
    yield axios.put(`/api/seller/${sellerId}`, action.payload);
    yield put({ type: "FETCH_SELLER_PAGEINFO", payload: refId });
  } catch (error) {
    console.log("error in updateCash Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* updateChecks(action) {
  const sellerId = action.payload.id;
  console.log(sellerId);
  const refId = action.payload.refId;
  console.log(refId);

  try {
    yield axios.put(`/api/seller/${sellerId}`, action.payload);
    yield put({ type: "FETCH_SELLER_PAGEINFO", payload: refId });
  } catch (error) {
    console.log("error in updateChecks Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* updateDonations(action) {
  const sellerId = action.payload.id;
  console.log(sellerId);
  const refId = action.payload.refId;
  console.log(refId);

  try {
    yield axios.put(`/api/seller/${sellerId}`, action.payload);
    yield put({ type: "FETCH_SELLER_PAGEINFO", payload: refId });
  } catch (error) {
    console.log("error in updateDonations Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* updateDigitalPayments(action) {
  console.log(action.payload);
  const sellerId = action.payload.id;
  console.log(sellerId);
  const refId = action.payload.refId;
  console.log(refId);

  try {
    yield axios.put(`/api/seller/${sellerId}`, action.payload);
    yield put({ type: "FETCH_SELLER_PAGEINFO", payload: refId });
  } catch (error) {
    console.log("error in updateDigitalPayments Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

export default function* sellerPageSaga() {
  yield takeEvery("FETCH_SELLER_PAGEINFO", fetchSeller);
  yield takeEvery("UPDATE_CASH", updateCash);
  yield takeEvery("UPDATE_CHECKS", updateChecks);
  yield takeEvery("UPDATE_DONATIONS", updateDonations);
  yield takeEvery("UPDATE_DIGITAL_PAYMENTS", updateDigitalPayments);
}
