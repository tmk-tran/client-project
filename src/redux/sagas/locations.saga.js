import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchLocations(action) {
  try {
    const items = yield axios.get(`/api/locations`);
    console.log("FETCH request from locations.saga, ITEMS = ", items.data);
    yield put({ type: "SET_LOCATIONS", payload: items.data });
  } catch (error) {
    console.log("error in locations Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* fetchMerchantLocation(action) {
  try {
    console.log(action.payload);
    const items = yield axios.get(`/api/locations/${action.payload}`);
    console.log(
      "FETCH request from merchantLocation.saga, ITEMS = ",
      items.data
    );
    yield put({ type: "SET_LOCATIONS", payload: items.data });
  } catch (error) {
    console.log("error in merchantLocation Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* addLocations(action) {
  try {
    console.log(action.payload);
    console.log(action.payload.merchant_id);
    yield axios.post(`/api/locations/`, action.payload);
    yield put({ type: "FETCH_MERCHANT_LOCATIONS", payload: action.payload.merchant_id});
  } catch (error) {
    console.log("error in addLocations Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* updateLocation(action) {
  try {
    console.log(action.payload);
    console.log(action.payload.merchant_id);
    yield axios.put(`/api/locations/${action.payload.id}`, action.payload);
    yield put({ type: "FETCH_MERCHANT_LOCATION", payload: action.payload.merchant_id});
  } catch (error) {
    console.log("error in updateLocation Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* deleteLocation(action) {
  console.log(action.payload);
  const locationId = action.payload.locationId;
  console.log(locationId);
  const merchantId = action.payload.merchantId;
  console.log(merchantId);

  try {
    const response = yield axios.delete(`/api/locations/${locationId}`);
    console.log(
      "DELETE request from locations.saga, response FOR DELETE = ",
      response
    );
    yield put({ type: "FETCH_MERCHANT_LOCATION", payload: merchantId });
  } catch (error) {
    console.log("error with deleteLocation request", error);
  }
}

export default function* merchantCommentsSaga() {
  yield takeEvery("FETCH_LOCATIONS", fetchLocations);
  yield takeEvery("FETCH_MERCHANT_LOCATION", fetchMerchantLocation);
  yield takeEvery("ADD_LOCATION", addLocations);
  yield takeEvery("UPDATE_LOCATION", updateLocation);
  yield takeEvery("DELETE_LOCATION", deleteLocation);
}
