//Imports used for this saga
import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

//Fetches fundraiser data based on the group id
function* fetchFundraisersSaga(action) {
    try {
        const auth_response = action.payload.auth
        const ACCESS_TOKEN = auth_response.data.access_token;
        const QUERY_URL = auth_response.data.routes.query;
        const query = `{\r\n   fundraiser (filter: "group_id = ${action.payload.id}"){\r\n id\r\n group_id\r\n title\r\n description\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_checked_out_total_value\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n group {\r\n organization_id\r\n department\r\n sub_department\r\n group_nickname\r\n group_photo\r\n group_description\r\n is_deleted\r\n organization{\r\n organization_name\r\n type\r\n address\r\n city\r\n state\r\n zip\r\n primary_contact_first_name\r\n primary_contact_last_name\r\n primary_contact_phone\r\n primary_contact_email\r\n organization_logo\r\n is_deleted\r\n organization_earnings\r\n}\r\n}coupon_book {\r\n id\r\n year\r\n}\r\n}\r\n}`

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
        yield put({ type: "SET_FUNDRAISERS", payload: response.data.fundraiser })
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
        const newFundraiser = action.payload.newFundraiser
        const auth_response = action.payload.auth
        const ACCESS_TOKEN = auth_response.data.access_token;
        const QUERY_URL = auth_response.data.routes.query;
        const query = `{\r\n    mutation($input: fundraiserInput){\r\n create_fundraiser(input: $input){\r\n id\r\n group_id\r\n title\r\n description\r\n photo\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}\r\n}`

        const queryConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        const data = new FormData();
        data.append("query", query);
        data.append("variables", `{"input":{\r\n "group_id": ${Number(newFundraiser.group_id)},\r\n "title": ${newFundraiser.title},\r\n "description": ${newFundraiser.description},\r\n "requested_book_quantity": ${Number(newFundraiser.requested_book_quantity)},\r\n "book_quantity_checked_out": ${Number(newFundraiser.book_quantity_checked_out)},\r\n "book_quantity_checked_in": ${Number(newFundraiser.book_quantity_checked_in)},\r\n "books_sold": ${Number(newFundraiser.books_sold)},\r\n "money_received": ${Number(newFundraiser.money_received)},\r\n "start_date": ${Date(newFundraiser.start_date)},\r\n "end_date": ${Date(newFundraiser.end_date)},\r\n "coupon_book_id": ${Number(newFundraiser.coupon_book_id)},\r\n "goal": ${Number(newFundraiser.goal)}\r\n}}`);
        console.log(data)

        yield axios.post(QUERY_URL, data, queryConfig);
        yield put({ type: "FETCH_FUNDRAISERS", payload: { id: Number(newFundraiser.newFundraisergroup_id), auth: auth_response } })
    } catch (error) {
        console.log("Unable to add fundraiser", error)
    }
}

//Saga used to update the amounts in a fundraiser, will then fetch the updated fundraiser data
function* updatedFundraiserAmountsSaga(action) {
    try {
        console.log(action.payload)
        const updatedFundraiser = action.payload.updatedFundraiser
        const auth_response = action.payload.auth
        const ACCESS_TOKEN = auth_response.data.access_token;
        const QUERY_URL = auth_response.data.routes.query;
        const query = `{\r\n    mutation($input: fundraiserInput, id: ${updatedFundraiser.id}){\r\n create_fundraiser(input:$input\r\n id: ){\r\n id\r\n group_id\r\n title\r\n description\r\n photo\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}\r\n}`

        const queryConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        const data = new FormData();
        data.append("query", query);
        data.append("variables", `{\r\n     "input":{\r\n "group_id": ${Number(updatedFundraiser.group_id)},\r\n "title": ${updatedFundraiser.title},\r\n "description": ${updatedFundraiser.description},\r\n "requested_book_quantity": ${Number(updatedFundraiser.requested_book_quantity)},\r\n "book_quantity_checked_out": ${Number(updatedFundraiser.newBooksCheckedOut)},\r\n "book_quantity_checked_in": ${Number(updatedFundraiser.NewBooksCheckedIn)},\r\n "books_sold": ${Number(updatedFundraiser.newBooksSold)},\r\n "money_received": ${Number(updatedFundraiser.newMoneyReceived)},\r\n "start_date": ${updatedFundraiser.start_date},\r\n "end_date": ${updatedFundraiser.end_date},\r\n "coupon_book_id": ${Number(updatedFundraiser.coupon_book_id)},\r\n "goal": ${Number(updatedFundraiser.newGoal)},"" \r\n}\r\n}`);
        console.log(data)

        yield axios.post(QUERY_URL, data, queryConfig);
        yield put({ type: "FETCH_FUNDRAISERS", payload: { group_id: Number(action.payload.updatedFundraiser.group_id), auth: auth } })
    } catch (err) {
        console.log("Unable to update amounts for fundraisers", err)
    }
}
//Saga used to update a fundraiser to closed, will then fetch updated fundraisers data
function* closeFundraiserSaga(action) {
    try {
        console.log(action.payload)
        const closedFundraiser = action.payload.closedFundraiser
        const auth_response = action.payload.auth
        const ACCESS_TOKEN = auth_response.data.access_token;
        const QUERY_URL = auth_response.data.routes.query;
        const query = `{\r\n    mutation($input: fundraiserInput, id: ${closedFundraiser.id}){\r\n update_fundraiser(input:$input\r\n id: ){\r\n id\r\n group_id\r\n title\r\n description\r\n photo\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}\r\n}`

        const queryConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        const data = new FormData();
        data.append("query", query);
        data.append("variables", `{\r\n     "input":{\r\n "group_id": ${Number(closedFundraiser.group_id)},\r\n "title": ${closedFundraiser.title},\r\n "description": ${closedFundraiser.description},\r\n "requested_book_quantity": ${Number(closedFundraiser.requested_book_quantity)},\r\n "book_quantity_checked_out": ${Number(closedFundraiser.book_quantity_checked_out)},\r\n "book_quantity_checked_in": ${Number(closedFundraiser.book_quantity_checked_in)},\r\n "books_sold": ${Number(closedFundraiser.books_sold)},\r\n "money_received": ${Number(closedFundraiser.money_received)},\r\n "start_date": ${closedFundraiser.start_date},\r\n "end_date": ${closedFundraiser.end_date},\r\n "coupon_book_id": ${Number(closedFundraiser.coupon_book_id)},\r\n "goal": ${Number(closedFundraiser.goal)}, "closed": ${closedFundraiser.closed}\r\n}\r\n}`);
        console.log(data)

        yield axios.post(QUERY_URL, data, queryConfig);
        yield put({ type: "FETCH_FUNDRAISERS", payload: { id: Number(closedFundraiser.group_id), auth: auth_response } })
    } catch (err) {
        console.log("Error setting fundraiser to closed", err)
    }
}
//Saga used to update a fundraiser to open, will then fetch updated fundraisers data
function* openFundraiserSaga(action) {
    try {
        
            console.log(action.payload)
            const openedFundraiser = action.payload.openedFundraiser
            const auth_response = action.payload.auth
            const ACCESS_TOKEN = auth_response.data.access_token;
            const QUERY_URL = auth_response.data.routes.query;
            const query = `{\r\n    mutation($input: fundraiserInput, id: ${openedFundraiser.id}){\r\n update_fundraiser(input:$input\r\n id: ){\r\n id\r\n group_id\r\n title\r\n description\r\n photo\r\n requested_book_quantity\r\n book_quantity_checked_out\r\n book_quantity_checked_in\r\n books_sold\r\n money_received\r\n start_date\r\n end_date\r\n coupon_book_id\r\n outstanding_balance\r\n is_deleted\r\n closed\r\n goal\r\n}\r\n}\r\n}`

            const queryConfig = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            };

            const data = new FormData();
            data.append("query", query);
            data.append("variables", `{\r\n     "input":{\r\n "group_id": ${Number(openedFundraiser.group_id)},\r\n "title": ${openedFundraiser.title},\r\n "description": ${openedFundraiser.description},\r\n "requested_book_quantity": ${Number(openedFundraiser.requested_book_quantity)},\r\n "book_quantity_checked_out": ${Number(openedFundraiser.book_quantity_checked_out)},\r\n "book_quantity_checked_in": ${Number(openedFundraiser.book_quantity_checked_in)},\r\n "books_sold": ${Number(openedFundraiser.books_sold)},\r\n "money_received": ${Number(openedFundraiser.money_received)},\r\n "start_date": ${openedFundraiser.start_date},\r\n "end_date": ${openedFundraiser.end_date},\r\n "coupon_book_id": ${Number(openedFundraiser.coupon_book_id)},\r\n "goal": ${Number(openedFundraiser.goal)}, "closed": ${openedFundraiser.closed}\r\n}\r\n}`);

            yield axios.post(QUERY_URL, data, queryConfig);
            yield put({ type: "FETCH_FUNDRAISERS", payload: { id: Number(openedFundraiser.group_id), auth: auth_response } })
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