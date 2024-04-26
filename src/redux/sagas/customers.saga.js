import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchCustomers() {
  try {
    const items = yield axios.get(`/api/customers/`);
    console.log("FETCH request from customers.saga, ITEMS = ", items.data);
    yield put({ type: "SET_CUSTOMERS", payload: items.data });
  } catch (error) {
    console.log("error in customers Saga", error);
  }
}

function* fetchCustomerEmail(action) {
  console.log("from customers.saga, action.payload = ", action.payload);
  const customerId = action.payload.id;
  try {
    const items = yield axios.get(`/api/customers/${customerId}`);
    console.log("FETCH request from customers.saga, ITEMS = ", items.data);
    yield put({ type: "SET_CUSTOMERS", payload: items.data });
  } catch (error) {
    console.log("error in customers Saga", error);
  }
}

function* addCustomer(action) {
  console.log(action);
  console.log(action.payload);
  try {
    // Clear any existing error messages
    yield put({ type: "CLEAR_ERROR_MESSAGE" });
    const response = yield axios.post(`/api/customers/`, action.payload);
    console.log(response.data);

    // Email does not exist, proceed with other actions
    const newCustomerId = response.data[0].id; // Assuming response.data is an object with an 'id' property
    yield put({
      type: "FETCH_CUSTOMER_EMAIL",
      payload: {
        id: newCustomerId,
      },
    });
  } catch (error) {
    console.log("error in addCustomer Saga", error);
    console.log(error.response.data);
    // Handle other errors if needed
    if (error.response && error.response.data && error.response.data.error) {
      // Set an error message for the email
      yield put({
        type: "SET_ERROR_MESSAGE",
        payload: error.response.data.error,
      });
    }
    // throw error; // Throw the error to indicate failure <--- DO NOT NEED THIS!!
  }
}

export default function* merchantCommentsSaga() {
  yield takeEvery("FETCH_CUSTOMERS", fetchCustomers);
  yield takeEvery("FETCH_CUSTOMER_EMAIL", fetchCustomerEmail);
  yield takeEvery("ADD_CUSTOMER", addCustomer);
}
