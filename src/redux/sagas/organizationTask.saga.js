import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* organizationTask(action) {
  console.log(action.payload);
  try {
    const items = yield axios.get(`/api/organizationTask/${action.payload}`);
    console.log(
      "FETCH request from organizationTask.saga, ITEMS = ",
      items.data
    );
    yield put({ type: "SET_ORG_TASKS", payload: items.data });
  } catch (error) {
    console.log("error in organizationTasks Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* fetchAllOrganizationTasks() {
  try {
    const items = yield axios.get("/api/tasks/organizations");
    console.log("FETCH all organization tasks, ITEMS = ", items.data);
    yield put({ type: "SET_ORG_TASKS", payload: items.data });
  } catch (error) {
    console.log("error in fetchAllOrganizationTasks Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* addOrganizationTask(action) {
  try {
    const items = yield axios.post("/api/tasks/organizations", action.payload);
    console.log(
      "FETCH request from organizationTask.saga, ITEMS FOR add = ",
      items
    );
    console.log("organizationTask action.payload = ", action.payload);

    yield put({
      type: "FETCH_ALL_ORGANIZATION_TASKS",
      payload: action.payload.id,
    });
  } catch (err) {
    console.log("error in addOrganizationTask Saga", err);
  }
}

function* editOrganizationTask(action) {
  try {
    const items = yield axios.put(
      `/api/tasks/organizations/${action.payload.id}`,
      action.payload
    );
    console.log(
      "FETCH request from organizationTask.saga, ITEMS FOR edit = ",
      items
    );
    console.log("organizationTask action.payload = ", action.payload);

    yield put({
      type: "FETCH_ALL_ORGANIZATION_TASKS",
      payload: action.payload.id,
    });
  } catch (err) {
    console.log("error in editOrganizationTask Saga", err);
  }
}

function* deleteOrganizationTask(action) {
  try {
    const items = yield axios.delete(
      `/api/tasks/organizations/${action.payload.id}`
    );
    console.log(
      "FETCH request from organizationsTask.saga, ITEMS FOR delete = ",
      items
    );
    console.log("organizationsTask action.payload = ", action.payload);

    yield put({
      type: "FETCH_ALL_ORGANIZATION_TASKS",
      payload: action.payload.id,
    });
  } catch (err) {
    console.log("error in deleteOrganizationsTask Saga", err);
  }
}

export default function* organizationTaskSaga() {
  yield takeEvery("FETCH_ORGANIZATION_TASKS", organizationTask);
  yield takeEvery("FETCH_ALL_ORGANIZATION_TASKS", fetchAllOrganizationTasks);
  yield takeEvery("ADD_ORGANIZATION_TASK", addOrganizationTask);
  yield takeEvery("UPDATE_ORGANIZATION_TASK", editOrganizationTask);
  yield takeEvery("ARCHIVE_ORGANIZATION_TASK", deleteOrganizationTask);
}
