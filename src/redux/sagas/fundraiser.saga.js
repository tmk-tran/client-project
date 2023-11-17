//Imports used for this saga
import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";
//Fetches fundraiser data based on the group id
function* fetchFundraisersSaga(action) {
    try {
        console.log(action.payload)
        const response = yield axios.get(`/api/fundraisers/groupfundraisers/${action.payload}`)
        yield put({ type: "SET_FUNDRAISERS", payload: response.data })
    } catch (err) {
        console.log("Error fetching fundraisers ", err)
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
//Saga used to update details in a fundraiser, will then fetch the updated fundraiser list
function* updatedFundraiserSaga(action) {
    try {
        console.log(action.payload)
        yield axios.put(`/api/fundraisers/${action.payload.id}`, action.payload)
        yield put({ type: "FETCH_FUNDRAISERS", payload: Number(action.payload.group_id) })
    } catch (err) {
        console.log("Unable to update fundraiser", err)
    }
}
//Saga used to update the amounts in a fundraiser
function* updatedFundraiserAmountsSaga(action) {
    try {
        console.log(action.payload)
        yield axios.put(`/api/fundraisers/money/${action.payload.id}`, action.payload)
        yield put({ type: "FETCH_FUNDRAISERS", payload: Number(action.payload.group_id) })
    } catch (err) {
        console.log("Unable to update amounts for fundraisers", err)
    }
}

function* closeFundraiserSaga(action) {
    try {
        console.log(action.payload)
        yield axios.put(`/api/fundraisers/close/${action.payload.id}`)
        yield put({ type: "FETCH_FUNDRAISERS", payload: Number(action.payload.group_id) })
    } catch (err) {
        console.log("Error setting fundraiser to closed", err)
    }
}

export default function* fundraiserSaga() {
    yield takeEvery("FETCH_FUNDRAISERS", fetchFundraisersSaga);
    yield takeEvery("ADD_FUNDRAISER", addFundraiserSaga);
    yield takeEvery("UPDATE_FUNDRAISER", updatedFundraiserSaga);
    yield takeEvery("CLOSE_FUNDRAISER", closeFundraiserSaga);
    yield takeEvery("UPDATE_FUNDRAISER_AMOUNTS", updatedFundraiserAmountsSaga)
}