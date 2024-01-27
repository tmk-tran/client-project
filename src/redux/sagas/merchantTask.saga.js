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

function* editMerchantTask(action) {
  try {
    const items = yield axios.put(
      `/api/tasks/${action.payload.id}`,
      action.payload
    );
    console.log(
      "FETCH request from merchantTask.saga, ITEMS FOR edit = ",
      items
    );
    console.log("merchantTask action.payload = ", action.payload);

    yield put({
      type: "SET_MERCHANT_TASKS",
      payload: action.payload.merchant_id,
    });
  } catch {
    console.log("error in editMerchantTask Saga");
  }
}

// function* updateTask(action) {
//   try {
//     const { taskId, updatedTaskData } = action.payload;

//     // Send a PUT request to update the specific task
//     yield axios.put(`/api/tasks/${taskId}`, updatedTaskData);

//     // After the update, fetch all tasks again or update the specific task in the state
//     const updatedItems = yield axios.get("/api/tasks");
//     yield put({ type: "SET_MERCHANT_TASKS", payload: updatedItems.data });
//   } catch (error) {
//     console.log("error in updateTask Saga", error);
//     yield put({ type: "SET_ERROR", payload: error });
//   }
// }


export default function* merchantNotesSaga() {
  yield takeEvery("FETCH_MERCHANT_TASKS", merchantTask);
  yield takeEvery("FETCH_ALL_MERCHANT_TASKS", fetchAllMerchantTasks);
  // yield takeEvery("UPDATE_MERCHANT_TASK", updateTask);
  yield takeEvery("UPDATE_MERCHANT_TASK", editMerchantTask);
  //   yield takeEvery("ADD_MERCHANT_NOTES", addNotes);
}
