import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* merchantComments(action) {
  console.log(action.payload);
  try {
    const items = yield axios.get(`/api/merchantComments/${action.payload}`);
    console.log(
      "FETCH request from merchantComments.saga, ITEMS = ",
      items.data
    );
    yield put({ type: "SET_MERCHANT_COMMENTS", payload: items.data });
  } catch(error) {
    console.log("error in merchantComments Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* addComments(action) {
  try {
    console.log(action.payload);
    yield axios.post(`/api/merchantComments/`, action.payload);
    yield put({ type: "FETCH_MERCHANT_COMMENTS", payload: action.payload });
  } catch (error) {
    console.log("error in addComments Merchant Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

export default function* merchantCommentsSaga() {
  yield takeEvery("FETCH_MERCHANT_COMMENTS", merchantComments);
  yield takeEvery("ADD_MERCHANT_COMMENTS", addComments);
}
