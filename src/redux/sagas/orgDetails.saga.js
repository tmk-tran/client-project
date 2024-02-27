import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";



function* orgDetails(action) {
  try {
    const auth_response = action.payload.auth
    const ACCESS_TOKEN = auth_response.data.access_token;
    const QUERY_URL = auth_response.data.routes.query;
    console.log(auth_response)
    console.log(action.payload)
  const query = `{\r\n organization (filter: "id =${action.payload.id} "){\r\n  id\r\n  organization_name\r\n  type\r\n  address\r\n  city\r\n  state\r\n  zip\r\n  primary_contact_first_name\r\n  primary_contact_last_name\r\n  primary_contact_phone\r\n  primary_contact_email\r\n  organization_logo\r\n  is_deleted\r\n  organization_earnings\r\n  organization_notes_collection{\r\n organization_id\r\nnote_date\r\nnote_content\r\nis_deleted\r\n }\r\n  group_collection{\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_description\r\n is_deleted\r\n fundraiser_collection{\r\n  goal\r\n}\r\n}\r\n}\r\n}`;

    const queryConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    
    const data = new FormData();
    data.append("query", query);
    data.append("variables", `{}`);

    const response = yield axios.post(QUERY_URL, data, queryConfig);
    console.log(response)
    yield put({ type: "SET_ORG_DETAILS", payload: response.data.organization });
  } catch(error) {
    console.log("error in orgDetailsSaga", error);
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
