import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchArchivedOrganizationsSaga() {
    try {
      const response = yield axios.post("/api/archivedOrganizations");
      console.log("FETCH request fetchArchivedOrganizationsSaga");
      yield put({ type: "SET_ARCHIVED_ORGANIZATIONS", payload: response.data });
    } catch(error) {
      console.log("error in fetchArchivedOrganizationsSaga", error);
    }
  }


  function* resetOrganizationSaga(action) {
    try {
      yield axios.delete(`/api/archivedOrganizations/${action.payload}`);
      yield put({ type: "FETCH_ARCHIVED_ORGANIZATIONS" });
    } catch (error) {
      console.log("error with deleteOrganizationSaga request", error);
    }
  }


  export default function* archivedOrganizationsSaga() {
    yield takeEvery("FETCH_ARCHIVED_ORGANIZATIONS", fetchArchivedOrganizationsSaga);

    yield takeEvery("RESET_ORGANIZATION", resetOrganizationSaga);
  }