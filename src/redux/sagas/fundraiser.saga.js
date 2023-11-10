import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchFundraisersSaga(action) {
    try {
        console.log(action.payload)
        const response = yield axios.get(`/api/fundraisers/${action.payload}`)
        yield put ({ type: "SET_FUNDRAISERS", payload: response.data})
    } catch (err) {
        console.log("Error fetching fundraisers ", err)
    }
}

function* addFundraiserSaga(action) {
    try {
        console.log(action.payload)
        yield axios.post("/api/fundraisers", action.payload)
        yield put({ type: "FETCH_FUNDRAISERS"})
    } catch (err) {
        console.log("Unable to add fundraiser", err)
    }
}

function* updatedFundraiserSaga(action) {
    try {
        console.log(action.payload)
        yield axios.put(`/api/fundraisers/${action.payload.id}`, action.payload)
        yield put ({type: "FETCH_FUNDRAISERS" })
    } catch (err) {
        console.log("Unable to update fundraiser", err)
    }
}

export default function* fundraiserSaga() {
    yield takeEvery ("FETCH_FUNDRAISERS", fetchFundraisersSaga);
    yield takeEvery ("ADD_FUNDRAISER", addFundraiserSaga);
    yield takeEvery ("UPDATE_FUNDRAISER", updatedFundraiserSaga)
}