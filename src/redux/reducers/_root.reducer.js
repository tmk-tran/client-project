import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";

import orgDetailsReducer from "./orgDetails.reducer";
import organizations from "./organizations.reducer.js";
import group from "./group.reducer";
import fundraisers from "./fundraisers.reducer";
import orgFundraisers from "./orgFundraiser.js";
import orgGroups from "./orgGroups.reducer";
import archivedOrganizations from "./archivedOrganizations.reducer.js";
import allGroups from "./allGroups.reducer.js";
import couponBooks from "./couponBook.reducer";
import orgNotes from "./orgNotes.reducer.js";
import allUsers from './allUsers.reducer.js';
import groupAdmin from "./groupAdmin.reducer"
import auth from "./auth.reducer";

// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  orgDetailsReducer,
  organizations,
  group,
  fundraisers,
  orgFundraisers,
  orgGroups,
  archivedOrganizations,
  allGroups,
  couponBooks,
  groupAdmin,
  orgNotes,
  allUsers,
  auth
});

export default rootReducer;
