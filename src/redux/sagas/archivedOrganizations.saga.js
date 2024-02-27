import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchArchivedOrganizationsSaga(action) {
    try {
      const auth_response = action.payload
    const ACCESS_TOKEN = auth_response.data.access_token;
    const QUERY_URL = auth_response.data.routes.query;
    console.log(auth_response)
  const query = `{\r\n organization(ordering: "group_collection.organization_id" filter: "is_deleted = true"){\r\n id\r\n organization_name\r\n type\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n primary_contact_phone\r\n primary_contact_email\r\n organization_logo\r\n is_deleted\r\n organization_earnings\r\n organization_notes_collection {\r\n organization_id\r\n note_date\r\n note_content\r\n is_deleted\r\n}\r\n group_collection {\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_description\r\n is_deleted\r\n fundraiser_collection{\r\n id\r\n group_id\r\n title\r\n description\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_checked_out_total_value\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}\r\n} Aggregates{\r\n
    total_groups: count(subquery: "query{group{id organization_id}}")\r\n
     total_fundraisers: count(subquery: "query{group{ id organization_id fundraiser_collection{id  group_id}}}" 
      ordering: "group_id")\r\n
 		total_open_fundraisers: count(subquery: "query{group{id organization_id fundraiser_collection{group_id}}}" 
      filter: " fundraiser_collection.closed=false" 
      ordering: "group_id")\r\n
    total_closed_fundraisers: count(subquery: "query{group{ id organization_id fundraiser_collection{group_id}}}" 
      filter: " fundraiser_collection.closed=true" 
      ordering: "group_id")\r\n
    total_books_sold: sum(subquery: "query{group{id organization_id fundraiser_collection{books_sold group_id}}}" 
      ordering: "id")\r\n 
     total_outstanding_balance: sum(subquery: "query{group{id organization_id fundraiser_collection{outstanding_balance group_id}}}" 
      ordering: "id")\r\n
    total_books_checked_out: count
    (subquery: "query{group{ id organization_id fundraiser_collection{group_id book_quantity_checked_out}}}" 
      filter: " fundraiser_collection.closed=false" 
      ordering: "group_id")\r\n
     total_books_checked_in: count
    (subquery: "query{group{ id organization_id fundraiser_collection{group_id book_quantity_checked_in}}}" 
      filter: " fundraiser_collection.closed=false" 
      ordering: "group_id")\r\n}\r\n}`;

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
    console.log("FETCH request fetchOrganizationsSaga");
      yield put({ type: "SET_ARCHIVED_ORGANIZATIONS", payload: response.data.organization });
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