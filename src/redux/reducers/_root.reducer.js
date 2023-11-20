import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";

import orgDetailsReducer from "./orgDetails.reducer";
import organizations from "./organizations.reducer.js";
import group from "./group.reducer";
import fundraisers from "./fundraisers.reducer";
import orgGroups from "./orgGroups.reducer";
import archivedOrganizations from "./archivedOrganizations.reducer.js";
import allGroups from "./allGroups.reducer.js";
import couponBooks from "./couponBook.reducer";
import groupAdmin from "./groupAdmin.reducer.js";
import orgNotes from "./orgNotes.reducer.js";

// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  orgDetailsReducer,
  organizations,
  group,
  fundraisers,
  orgGroups,
  archivedOrganizations,
  allGroups,
  couponBooks,
  groupAdmin,
  orgNotes,
});

export default rootReducer;
