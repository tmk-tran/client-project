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
  }
}

export default function* merchantNotesSaga() {
  yield takeEvery("FETCH_MERCHANT_NOTES", merchantNotes);
}
