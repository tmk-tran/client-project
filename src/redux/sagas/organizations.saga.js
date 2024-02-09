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
  console.log(action.payload);
  console.log(action.payload.dataId);
  const organizationId = action.payload.dataId;
  try {
    yield axios.delete(`/api/organizations/${organizationId}`);
    yield put({ type: "FETCH_ORGANIZATIONS" });
  } catch (error) {
    console.log("error with deleteOrganizationSaga request", error);
  }
}

function* editOrganizationSaga(action) {
  try {
    console.log("ACTION PAYLOAD IS", action.payload);
    console.log(action.payload.editedAccount);
    const orgId = action.payload.editedAccount.id;
    console.log(orgId);

    // Create a FormData object to send the file data
    const formData = new FormData();
    formData.append(
      "organization_name",
      action.payload.editedAccount.organization_name
    );
    formData.append("type", action.payload.editedAccount.type);
    formData.append("address", action.payload.editedAccount.address);
    formData.append("city", action.payload.editedAccount.city);
    formData.append("state", action.payload.editedAccount.state);
    formData.append("zip", action.payload.editedAccount.zip);
    formData.append(
      "primary_contact_first_name",
      action.payload.editedAccount.primary_contact_first_name
    );
    formData.append(
      "primary_contact_last_name",
      action.payload.editedAccount.primary_contact_last_name
    );
    formData.append(
      "primary_contact_phone",
      action.payload.editedAccount.primary_contact_phone
    );
    formData.append(
      "primary_contact_email",
      action.payload.editedAccount.primary_contact_email
    );
    formData.append(
      "organization_earnings",
      action.payload.editedAccount.organization_earnings
    );

    // Check if a file is uploaded
    if (action.payload.editedAccount.uploadedFile) {
      formData.append(
        "organization_logo",
        action.payload.editedAccount.uploadedFile
      );
      formData.append(
        "filename",
        action.payload.editedAccount.uploadedFile.name
      );
    }

    const response = yield axios.put(`/api/organizations/${orgId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
      },
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
