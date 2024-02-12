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
      console.log("FETCH request from merchantLocation.saga, ITEMS = ", items.data);
      yield put({ type: "SET_LOCATIONS", payload: items.data });
    } catch (error) {
      console.log("error in merchantLocation Saga", error);
      yield put({ type: "SET_ERROR", payload: error });
    }
  
};

function* addLocations(action) {
  try {
    console.log(action.payload);
    console.log(action.payload.merchant_id);
    yield axios.post(`/api/locations/`, action.payload);
    yield put({ type: "FETCH_LOCATIONS" });
  } catch (error) {
    console.log("error in addLocations Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

export default function* merchantCommentsSaga() {
  yield takeEvery("FETCH_LOCATIONS", fetchLocations);
  yield takeEvery("FETCH_MERCHANT_LOCATION", fetchMerchantLocation);
  yield takeEvery("ADD_LOCATION", addLocations);
}
