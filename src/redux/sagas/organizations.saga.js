import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchOrganizationsSaga() {
    try {
      const response = yield axios.get("/api/organizations");
      console.log("FETCH request fetchOrganizationsSaga");
      yield put({ type: "SET_ORGANIZATIONS", payload: response.data });
    } catch {
      console.log("error in fetchOrganizationsSaga");
    }
  }

  function* addOrganizationSaga(action) {
    try {
      console.log(action.payload);
      yield axios.post("/api/organizations", action.payload);
      yield put({ type: "FETCH_ORGANIZATIONS" });
    } catch (error) {
      console.log("error in addOrganizationSaga", error);
    }
  }

  function* deleteOrganizationSaga(action) {
    try {
      yield axios.delete(`/api/organizations/${action.payload}`);
      yield put({ type: "FETCH_ORGANIZATIONS" });
    } catch (error) {
      console.log("error with deleteOrganizationSaga request", error);
    }
  }


  export default function* organizationsSaga() {
    yield takeEvery("FETCH_ORGANIZATIONS", fetchOrganizationsSaga);
    yield takeEvery("ADD_ORGANIZATION", addOrganizationSaga);
    yield takeEvery("DELETE_ORGANIZATION", deleteOrganizationSaga);
  }