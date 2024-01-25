import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* merchantTask(action) {
  console.log(action.payload);
  try {
    const items = yield axios.get(`/api/merchantTask/${action.payload}`);
    console.log("FETCH request from merchantTask.saga, ITEMS = ", items.data);
    yield put({ type: "SET_MERCHANT_TASKS", payload: items.data });
  } catch {
    console.log("error in merchantTasks Saga");
    yield put({ type: "SET_ERROR", payload: error });
  }
}

export default function* merchantNotesSaga() {
  yield takeEvery("FETCH_MERCHANT_TASKS", merchantTask);
  //   yield takeEvery("ADD_MERCHANT_NOTES", addNotes);
}
