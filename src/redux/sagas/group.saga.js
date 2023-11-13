import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchGroupSaga(action) {
    try {
        console.log(action.payload)
        const response = yield axios.get(`/api/group/${action.payload}`)
        yield put ({ type: "SET_GROUP_DETAILS", payload: response.data})
    } catch (error) {
        console.log("Error fetching group details", err)
    }
}

function* fetchOrgGroupsSaga(action) {
    try {
        console.log(action.payload)
        const response = yield axios.get(`/api/group/orggroups/${action.payload}`)
        yield put ({ type: "SET_ORG_GROUPS", payload: response.data})
    } catch (err) {
        console.log("Error fetching organization groups", err)
    }
}

function* addGroupSaga(action) {
    try {
        console.log(action.payload)
        yield axios.post("/api/group/", action.payload)
        yield put ({ type: "FETCH_ORG_GROUPS" })
    } catch (err) {
        console.log("Error adding a new group", err)
    }
}

function* updateGroupSaga(action) {
    try {
        console.log(action.payload)
    yield axios.put(`/api/group/${action.payload}`, action.payload)
    yield put ({ type: "FETCH_GROUP_DETAILS" })
    } catch (err) {
        console.log("Error updating group details", err)
    }    
}




export default function* groupSaga(){
    yield takeEvery("FETCH_GROUP_DETAILS", fetchGroupSaga)
    yield takeEvery("FETCH_ORG_GROUPS", fetchOrgGroupsSaga)
    yield takeEvery("ADD_GROUP",addGroupSaga)
    yield takeEvery("UPDATE_GROUP", updateGroupSaga)
}