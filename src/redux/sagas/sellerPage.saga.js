// import axios from "axios";
// import { put, takeEvery } from "redux-saga/effects";

// function* fetchSeller(action) {
//   try {
//     const items = yield axios.get(`/api/seller/${action.payload}`);
//     console.log("FETCH request from sellerPage.saga, ITEMS = ", items.data);
//     yield put({ type: "SET_SELLER_PAGEINFO", payload: items.data });
//   } catch (error) {
//     console.log("error in sellerPage Saga", error);
//     yield put({ type: "SET_ERROR", payload: error });
//   }
// }

// function* updateCash(action) {
//   const sellerId = action.payload.id;
//   console.log(sellerId);
//   const refId = action.payload.refId;
//   console.log(refId);

//   try {
//     yield axios.put(`/api/seller/${sellerId}`, action.payload);
//     yield put({ type: "FETCH_SELLER_PAGEINFO", payload: refId });
//   } catch (error) {
//     console.log("error in updateCash Saga", error);
//     yield put({ type: "SET_ERROR", payload: error });
//   }
// }

// function* updateChecks(action) {
//   const sellerId = action.payload.id;
//   console.log(sellerId);
//   const refId = action.payload.refId;
//   console.log(refId);

//   try {
//     yield axios.put(`/api/seller/${sellerId}`, action.payload);
//     yield put({ type: "FETCH_SELLER_PAGEINFO", payload: refId });
//   } catch (error) {
//     console.log("error in updateChecks Saga", error);
//     yield put({ type: "SET_ERROR", payload: error });
//   }
// }

// function* updateDonations(action) {
//   const sellerId = action.payload.id;
//   console.log(sellerId);
//   const refId = action.payload.refId;
//   console.log(refId);

//   try {
//     yield axios.put(`/api/seller/${sellerId}`, action.payload);
//     yield put({ type: "FETCH_SELLER_PAGEINFO", payload: refId });
//   } catch (error) {
//     console.log("error in updateDonations Saga", error);
//     yield put({ type: "SET_ERROR", payload: error });
//   }
// }

// function* updateDigitalPayments(action) {
//   console.log(action.payload);
//   const sellerId = action.payload.id;
//   console.log(sellerId);
//   const refId = action.payload.refId;
//   console.log(refId);

//   try {
//     yield axios.put(`/api/seller/${sellerId}`, action.payload);
//     yield put({ type: "FETCH_SELLER_PAGEINFO", payload: refId });
//   } catch (error) {
//     console.log("error in updateDigitalPayments Saga", error);
//     yield put({ type: "SET_ERROR", payload: error });
//   }
// }

// export default function* sellerPageSaga() {
//   yield takeEvery("FETCH_SELLER_PAGEINFO", fetchSeller);
//   yield takeEvery("UPDATE_CASH", updateCash);
//   yield takeEvery("UPDATE_CHECKS", updateChecks);
//   yield takeEvery("UPDATE_DONATIONS", updateDonations);
//   yield takeEvery("UPDATE_DIGITAL_PAYMENTS", updateDigitalPayments);
// }

import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

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

function* updateSeller(action, updateType) {
  const sellerId = action.payload.id;
  const refId = action.payload.refId;

  try {
    yield axios.put(`/api/seller/${sellerId}`, action.payload);
    yield put({ type: "FETCH_SELLER_PAGEINFO", payload: refId });
  } catch (error) {
    console.log(`error in update${updateType} Saga`, error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

export function* updateCash(action) {
  yield updateSeller(action, "Cash");
}

export function* updateChecks(action) {
  yield updateSeller(action, "Checks");
}

export function* updateDonations(action) {
  yield updateSeller(action, "Donations");
}

export function* updateDigitalPayments(action) {
  yield updateSeller(action, "DigitalPayments");
}

export default function* sellerPageSaga() {
  yield takeEvery("FETCH_SELLER_PAGEINFO", fetchSeller);
  yield takeEvery("UPDATE_CASH", updateCash);
  yield takeEvery("UPDATE_CHECKS", updateChecks);
  yield takeEvery("UPDATE_DONATIONS", updateDonations);
  yield takeEvery("UPDATE_DIGITAL_PAYMENTS", updateDigitalPayments);
}
