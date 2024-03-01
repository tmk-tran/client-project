import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";


import orgDetailsSaga from './orgDetails.saga';
import organizationsSaga from './organizations.saga';
import groupSaga from './group.saga';
import fundraiserSaga from './fundraiser.saga';
import archivedOrganizationsSaga from './archivedOrganizations.saga';
import allGroupsSaga from './allGroups.saga';
import couponBookSaga from './couponBook.saga';
import groupAdminSaga from './groupAdmin.saga';
import orgNotesSaga from './orgNotes.saga';
import allUsersSaga from './allUsers.saga';
import rolesSaga from './roles_pbac.saga';
import filesSaga from "./files.saga";


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    orgDetailsSaga(),
    organizationsSaga(),
    groupSaga(),
    fundraiserSaga(),
    archivedOrganizationsSaga(),
    allGroupsSaga(),
    couponBookSaga(),
    groupAdminSaga(),
    orgNotesSaga(),
    allUsersSaga(),
    rolesSaga()
    filesSaga(),

  ]);
}
