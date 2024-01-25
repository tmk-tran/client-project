import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* merchantNotes(action) {
  console.log(action.payload);
  try {
    const items = yield axios.get(`/api/merchantnotes/${action.payload}`);
    console.log("FETCH request from merchantNotes.saga, ITEMS = ", items.data);
    yield put({ type: "SET_MERCHANT_NOTES", payload: items.data });
  } catch {
    console.log("error in merchantNotes Saga");
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* addNotes(action) {
  try {
    console.log(action.payload);
    yield axios.post(`/api/merchantnotes/`, action.payload);
    yield put({ type: "FETCH_MERCHANT_NOTES", payload: action.payload });
  } catch (error) {
    console.log("error in addNotes Merchant Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

export default function* merchantNotesSaga() {
  yield takeEvery("FETCH_MERCHANT_NOTES", merchantNotes);
  yield takeEvery("ADD_MERCHANT_NOTES", addNotes);
}
