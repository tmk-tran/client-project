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

export default function* sellerPageSaga() {
  yield takeEvery("FETCH_SELLER_PAGEINFO", fetchSeller);
}
