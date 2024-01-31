import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* orgDetails(action) {
  try {
    const response = yield axios.post(`/api/orgDetails/${action.payload}`);
    console.log("FETCH request from orgDetails.saga, response = ", response);
    yield put({ type: "SET_ORG_DETAILS", payload: response.data });
  } catch {
    console.log("error in orgDetailsSaga");
  }
}


function* editOrg(action) {
  try {
    const items = yield axios.post(
      `/api/orgDetails/update/${action.payload.id}`,
      action.payload
    );
    console.log("FETCH request from orgDetails.saga, ITEMS FOR editContact = ", items);
    console.log("EDIT_CONTACT_INFO action.payload = ", action.payload);

    yield put({ type: "FETCH_ORG_DETAILS", payload: action.payload.organization_id });
  } catch {
    console.log("error in editOrgSaga");
  }
}

export default function* orgDetailsSaga() {
  yield takeEvery("FETCH_ORG_DETAILS", orgDetails);
  yield takeEvery("EDIT_ORG_DETAILS", editOrg);
}
