//Imports used for this saga
import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

//Fetches fundraiser data based on the group id
function* fetchFundraisersSaga(action) {
    try {
        const response = yield axios.post(`/api/fundraisers/groupfundraisers/${Number(action.payload)}`)
        yield put({ type: "SET_FUNDRAISERS", payload: response.data })
        console.log(response.data);
    } catch (err) {
        console.log("Error fetching fundraisers ", err)
    }
}

// Fetches fundraiser data based on organization id
function* fetchOrgFundraisersSaga(action) {
    try {
        const auth_response = action.payload.auth
        const orgId = action.payload.id
        const ACCESS_TOKEN = auth_response.data.access_token;
        const QUERY_URL = auth_response.data.routes.query;
        console.log(auth_response)
        console.log(action.payload)
      const query = `{\r\n   fundraiser (filter: "group.organization_id = ${orgId}"){\r\n id\r\n group_id\r\n title\r\n description\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_checked_out_total_value\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n group {\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n organization{\r\n organization_name\r\n type\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n primary_contact_phone\r\n primary_contact_email\r\n organization_logo\r\n is_deleted\r\n organization_earnings\r\n}\r\n}\r\n}\r\n}`;
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
        yield put({ type: "SET_ORG_FUNDRAISERS", payload: response.data.fundraiser })
    } catch (err) {
        console.log("Error fetching ORG fundraisers ", err)
    }
}

//Saga used to add a fundraiser, will then fetch the updated list of fundraisers
function* addFundraiserSaga(action) {
    try {
        console.log(action.payload)
        yield axios.post("/api/fundraisers", action.payload)
        yield put({ type: "FETCH_FUNDRAISERS", payload: Number(action.payload.group_id) })
    } catch (err) {
        console.log("Unable to add fundraiser", err)
    }
}

//Saga used to update the amounts in a fundraiser, will then fetch the updated fundraiser data
function* updatedFundraiserAmountsSaga(action) {
    try {
        console.log(action.payload)
        yield axios.post(`/api/fundraisers/${action.payload.id}`, action.payload)
        yield put({ type: "FETCH_FUNDRAISERS", payload: Number(action.payload.group_id) })
    } catch (err) {
        console.log("Unable to update amounts for fundraisers", err)
    }
}
//Saga used to update a fundraiser to closed, will then fetch updated fundraisers data
function* closeFundraiserSaga(action) {
    try {
        console.log(action.payload)
        yield axios.put(`/api/fundraisers/close/${action.payload.id}`)
        yield put({ type: "FETCH_FUNDRAISERS", payload: Number(action.payload.group_id) })
    } catch (err) {
        console.log("Error setting fundraiser to closed", err)
    }
}
//Saga used to update a fundraiser to open, will then fetch updated fundraisers data
function* openFundraiserSaga(action) {
    try {
        console.log(action.payload)
        yield axios.put(`/api/fundraisers/open/${action.payload.id}`)
        yield put({ type: "FETCH_FUNDRAISERS", payload: Number(action.payload.group_id) })
    } catch (err) {
        console.log("Error setting fundraiser to closed", err)
    }
}

//Watcher saga that exports all sagas to for use in the root saga
export default function* fundraiserSaga() {
    yield takeEvery("FETCH_FUNDRAISERS", fetchFundraisersSaga);
    yield takeEvery("FETCH_ORG_FUNDRAISERS", fetchOrgFundraisersSaga);
    yield takeEvery("ADD_FUNDRAISER", addFundraiserSaga);
    yield takeEvery("CLOSE_FUNDRAISER", closeFundraiserSaga);
    yield takeEvery("OPEN_FUNDRAISER", openFundraiserSaga);
    yield takeEvery("UPDATE_FUNDRAISER_AMOUNTS", updatedFundraiserAmountsSaga);
}