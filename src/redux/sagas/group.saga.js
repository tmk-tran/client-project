//Imports for use in groups saga
import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";
//Fetches group details based in id number
function* fetchGroupSaga(action) {
    try {
        console.log(action.payload)
        const response = yield axios.post(`/api/group/${action.payload}`)
        yield put({ type: "SET_GROUP_DETAILS", payload: response.data })
    } catch (err) {
        console.log("Error fetching group details", err)
    }
}
//Fetches organization groups based on group id
function* fetchOrgGroupsSaga(action) {
    try {
        console.log(action.payload)
        const response = yield axios.post(`/api/group/orggroups/${action.payload}`)
        yield put({ type: "SET_ORG_GROUPS", payload: response.data })
        console.log("response data = ", response.data);
    } catch (err) {
        console.log("Error fetching organization groups", err)
    }
}
//Saga used to add a new group to an organization, will then fetch the organization details
function* addGroupSaga(action) {
    try {
        console.log(action.payload)
        yield axios.post("/api/group/", action.payload)
        yield put({ type: "FETCH_ORG_GROUPS", payload: Number(action.payload.organization_id) })
        console.log("org id in saga  = ", Number(action.payload.organization_id));
    } catch (err) {
        console.log("Error adding a new group", err)
    }
}
//Saga used to update group details
function* updateGroupSaga(action) {
    try {
        console.log(action.payload)
        yield axios.post(`/api/group/${action.payload}`, action.payload)
        yield put({ type: "FETCH_GROUP_DETAILS", payload: action.payload.organization_id })
    } catch (err) {
        console.log("Error updating group details", err)
    }
}



//Watcher saga that exports all sagas for use in root saga
export default function* groupSaga() {
    yield takeEvery("FETCH_GROUP_DETAILS", fetchGroupSaga)
    yield takeEvery("FETCH_ORG_GROUPS", fetchOrgGroupsSaga)
    yield takeEvery("ADD_GROUP", addGroupSaga)
    yield takeEvery("UPDATE_GROUP", updateGroupSaga)
}