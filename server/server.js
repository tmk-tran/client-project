const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const groupRouter = require("./routes/group.details.router");
const orgDetailsRouter = require("./routes/orgDetails.router");
const organizationsRouter = require("./routes/organizations.router");
const fundraisersRouter = require("./routes/fundraisers.router");
const archivedOrganizationsRouter = require("./routes/archivedOrganizations.router");
const allGroupsRouter = require("./routes/allGroups.router");
const couponBookRouter = require("./routes/couponbook.router");
const groupAdminRouter = require("./routes/groupAdmin.router");
const orgNotesRouter = require("./routes/orgNotes.router");
const allUsersRouter = require("./routes/allUsers.router");
const couponRouter = require("./routes/couponPDF.router");
const merchantDetailsRouter = require("./routes/merchantDetails.router");
const merchantNotesRouter = require("./routes/merchantNotes.router");
const merchantTaskRouter = require("./routes/merchantTask.router");
const allTaskMRouter = require("./routes/allTasksM.router");
// const allTasksORouter = require("./routes/allTasksO.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);
app.use("/api/orgnotes", orgNotesRouter);
app.use("/api/orgdetails", orgDetailsRouter);
app.use("/api/organizations", organizationsRouter);
app.use("/api/fundraisers", fundraisersRouter);
app.use("/api/archivedOrganizations", archivedOrganizationsRouter);
app.use("/api/allGroups", allGroupsRouter);
app.use("/api/archivedOrganizations", archivedOrganizationsRouter);
app.use("/api/couponbook", couponBookRouter);
app.use("/api/groupAdmin", groupAdminRouter);
app.use("/api/allUsers", allUsersRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/merchantDetails", merchantDetailsRouter);
app.use("/api/merchantNotes", merchantNotesRouter);
app.use("/api/merchantTask", merchantTaskRouter);
app.use("/api/tasks", allTaskMRouter);
// app.use("/api/organization/tasks", allTasksORouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
