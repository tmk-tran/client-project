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

function* addCustomer(action) {
  console.log(action.payload);

  try {
    yield axios.post(`/api/customers/`, action.payload);
    yield put({
      type: "FETCH_CUSTOMERS",
    });
  } catch (error) {
    console.log("error in addCustomer Saga", error);
  }
}

export default function* merchantCommentsSaga() {
  yield takeEvery("FETCH_CUSTOMERS", fetchCustomers);
  yield takeEvery("ADD_CUSTOMER", addCustomer);
}
