import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* fetchSellers(action) {
  try {
    console.log(action.payload);
    const items = yield axios.get(`/api/sellers/${action.payload}`);
    console.log("FETCH request from sellers.saga, ITEMS = ", items.data);
    yield put({ type: "SET_SELLERS", payload: items.data });
  } catch (error) {
    console.log("error in sellers Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* addSeller(action) {
  try {
    console.log(action.payload);
    console.log(action.payload.organization_id);
    yield axios.post(`/api/sellers/`, action.payload);
    yield put({
      type: "FETCH_SELLERS",
      payload: action.payload.organization_id,
    });
  } catch (error) {
    console.log("error in addSeller Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* updateSeller(action) {
  try {
    console.log(action.payload);
    const sellerId = action.payload.id;
    const orgId = action.payload.organization_id;
    yield axios.put(`/api/sellers/${sellerId}`, action.payload);
    yield put({ type: "FETCH_SELLERS", payload: orgId });
  } catch (error) {
    console.log("error in updateSeller Saga", error);
    yield put({ type: "SET_ERROR", payload: error });
  }
}

function* archiveSeller(action) {
  console.log(action.payload);
  const sellerId = action.payload.sellerId;
  console.log(sellerId);
  const orgId = action.payload.orgId;
  console.log(orgId);

  try {
    const response = yield axios.delete(`/api/sellers/${sellerId}`);
    console.log(
      "DELETE request from sellers.saga, response FOR DELETE = ",
      response
    );
    yield put({ type: "FETCH_SELLERS", payload: orgId });
  } catch (error) {
    console.log("error with deleteSeller request", error);
  }
}

export default function* merchantCommentsSaga() {
  yield takeEvery("FETCH_SELLERS", fetchSellers);
  yield takeEvery("ADD_SELLER", addSeller);
  yield takeEvery("EDIT_SELLER", updateSeller);
  yield takeEvery("ARCHIVE_SELLER", archiveSeller);
}
