import { takeEvery, put, call } from "redux-saga/effects";
import { fetchAllMerchantTasks } from "./merchantTask.saga";
import { fetchAllOrganizationTasks } from "./organizationTask.saga";

function* fetchAllTasks(action) {
  const { type } = action.payload;

  try {
    if (type === "merchant") {
      const merchantTasks = yield call(fetchAllMerchantTasks);
      yield put({
        type: "SET_MERCHANT_TASKS",
        payload: merchantTasks,
      });
    } else if (type === "organization") {
      const organizationTasks = yield call(fetchAllOrganizationTasks);
      yield put({
        type: "SET_ORG_TASKS",
        payload: organizationTasks,
      });
    }
  } catch (error) {
      console.log("Error in fetchAllTasks.saga",error);
  }
}

export default function* allTasksSaga() {
  yield takeEvery("FETCH_ALL_TASKS", fetchAllTasks);
}
