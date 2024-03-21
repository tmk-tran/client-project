import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* couponList(action) {
  console.log(action.payload);
  try {
    const items = yield axios.get(`/api/userCoupon/${action.payload}`);
    console.log("FETCH request from userCoupon.saga, ITEMS = ", items.data);
    yield put({ type: "SET_COUPON_LIST", payload: items.data });
  } catch {
    console.log("error in userCouponSaga");
  }
}

export default function* userCouponSaga() {
  yield takeEvery("FETCH_CONSUMER_COUPONS", couponList);
}
