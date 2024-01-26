import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* merchantTask(action) {
  console.log(action.payload);
  try {
    const items = yield axios.get(`/api/merchantTask/${action.payload}`);
    console.log("FETCH request from merchantTask.saga, ITEMS = ", items.data);
    yield put({ type: "SET_MERCHANT_TASKS", payload: items.data });
  } catch (error) {
    console.log("error in merchantTasks Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

// ADD FETCH ALL MERCHANT TASKS TYPE
function* fetchAllMerchantTasks() {
  try {
    const items = yield axios.get("/api/tasks");
    console.log("FETCH all merchant tasks, ITEMS = ", items.data);
    yield put({ type: "SET_MERCHANT_TASKS", payload: items.data });
  } catch (error) {
    console.log("error in fetchAllMerchantTasks Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

export default function* merchantNotesSaga() {
  yield takeEvery("FETCH_MERCHANT_TASKS", merchantTask);
  yield takeEvery("FETCH_ALL_MERCHANT_TASKS", fetchAllMerchantTasks);
  //   yield takeEvery("ADD_MERCHANT_NOTES", addNotes);
}
