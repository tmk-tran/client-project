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

// function* addNotes(action) {
//   try {
//     console.log(action.payload);
//     yield axios.post(`/api/merchantnotes/`, action.payload);
//     yield put({ type: "FETCH_MERCHANT_NOTES", payload: action.payload.merchant_id });
//   } catch (error) {
//     console.log("error in addNotes Merchant Saga", error);
//     yield put({ type: "SET_ERROR", payload: error });
//   }
// }
function* addNotes(action) {
  console.log(action.payload);
  const merchant_id = action.payload.merchant_id;
  const note_date = action.payload.note_date;
  const note_content = action.payload.note_content;

  try {
    // const { merchant_id, note_date, note_content } = action.payload;
    yield axios.post(`/api/merchantnotes/`, {
      merchant_id,
      note_date,
      note_content,
    });
    yield put({ type: "FETCH_MERCHANT_NOTES", payload: { merchant_id } });
  } catch (error) {
    console.log("error in addNotes Merchant Saga", error);
    // yield put({ type: "SET_ERROR", payload: error });
  }
}

function* deleteMerchantNote(action) {
  console.log(action.payload);
  const noteId = action.payload.noteId;
  console.log(noteId);
  const merchantId = action.payload.entityId;

  try {
    const response = yield axios.delete(`/api/merchantnotes/${noteId}`);
    console.log(
      "DELETE request from merchantNotes.saga, response FOR DELETE = ",
      response
    );
    yield put({ type: "FETCH_MERCHANT_NOTES", payload: merchantId });
  } catch (error) {
    console.log("error with deleteMerchantNote request", error);
  }
}

export default function* merchantNotesSaga() {
  yield takeEvery("FETCH_MERCHANT_NOTES", merchantNotes);
  yield takeEvery("ADD_MERCHANT_NOTES", addNotes);
  yield takeEvery("DELETE_MERCHANT_NOTE", deleteMerchantNote);
}
