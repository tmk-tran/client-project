import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* orgNotes(action) {
  console.log(action.payload);
  try {
    const items = yield axios.get(`/api/orgnotes/${action.payload}`);
    console.log("FETCH request from orgNotes.saga, ITEMS = ", items);
    yield put({ type: "SET_ORG_NOTES", payload: items.data });
  } catch {
    console.log("error in orgNotes Saga");
  }
}

function* addNotes(action) {
  try {
    console.log(action.payload);
    yield axios.post(`/api/orgnotes/`, action.payload);
    yield put({ type: "FETCH_ORG_NOTES", payload: action.payload });
  } catch (error) {
    console.log("error in addNotes Saga", error);
  }
}

function* editNotes(action) {
  try {
    const items = yield axios.put(
      `/api/orgnotes/${action.payload.id}`,
      action.payload
    );
    console.log(
      "FETCH request from orgDetails.saga, ITEMS FOR editContact = ",
      items
    );
    console.log("EDIT_CONTACT_INFO action.payload = ", action.payload);

    yield put({
      type: "FETCH_ORG_NOTES",
      payload: action.payload.organization_id,
    });
  } catch {
    console.log("error in editNotes Saga");
  }
}

function* deleteOrgNote(action) {
  try {
    yield axios.delete(`/api/orgnotes/${action.payload}`);
    yield put({ type: "FETCH_ORG_NOTES" });
  } catch (error) {
    console.log("error with deleteOrgNotes request", error);
  }
}

export default function* orgDetailsSaga() {
  yield takeEvery("FETCH_ORG_NOTES", orgNotes);
  yield takeEvery("ADD_ORG_NOTES", addNotes);
  yield takeEvery("EDIT_ORG_NOTES", editNotes);
  yield takeEvery("DELETE_ORG_NOTE", deleteOrgNote);
}
