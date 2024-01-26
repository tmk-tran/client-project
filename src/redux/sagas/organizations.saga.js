import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchOrganizationsSaga() {
  try {
    const response = yield axios.post("/api/organizations");
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

function* editOrganizationSaga(action) {
  try {
    console.log("ACTION PAYLOAD IS", action.payload);
    const response = yield axios.put(`/api/organizations/${action.payload.id}`, {
      organization_name: action.payload.organization_name,
      type: action.payload.type,
      address: action.payload.address,
      city: action.payload.city,
      state: action.payload.state,
      zip: action.payload.zip,
      primary_contact_first_name: action.payload.primary_contact_first_name,
      primary_contact_last_name: action.payload.primary_contact_last_name,
      primary_contact_phone: action.payload.primary_contact_phone,
      primary_contact_email: action.payload.primary_contact_email,
      organization_earnings: action.payload.organization_earnings,
      organization_logo: action.payload.organization_logo,

    });
    console.log("RESPONSE IS", response);
    yield put({ type: "FETCH_ORGANIZATIONS", payload: action.payload });
  } catch (error) {
    console.log("error in edit invoice", error);
  }
}

export default function* organizationsSaga() {
  yield takeEvery("FETCH_ORGANIZATIONS", fetchOrganizationsSaga);
  yield takeEvery("ADD_ORGANIZATION", addOrganizationSaga);
  yield takeEvery("DELETE_ORGANIZATION", deleteOrganizationSaga);
  yield takeEvery("EDIT_ORGANIZATION", editOrganizationSaga);
}