import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Card, CardContent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory } from "react-router-dom";
import { capitalizeWords } from "../Utils/helpers.js";
import UserTable from "../UserTable/UserTable.jsx";

function UserProfile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_GROUP_ADMIN" });
    dispatch({ type: "FETCH_ORGANIZATIONS" });
    dispatch({ type: "FETCH_ALL_USERS" });
  }, []);

  const user = useSelector((store) => store.user);
  const groups = useSelector((store) => store.groupAdmin);
  const organizations = useSelector((store) => store.organizations);
  const totalOrganizations = organizations.length;
  const history = useHistory();

  const formatDate = (dateString) => {
    if (!dateString) {
      return " ";
    }
    const date = new Date(dateString); // Assuming the date string is in 'YYYY-MM-DD' format
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  let totalGroups = 0;
  for (let i = 0; i < organizations.length; i++) {
    const organization = organizations[i];
    totalGroups += parseInt(organization.total_groups, 10) || 0;
  }
  console.log("GROUPS", totalGroups);

  let totalActiveFundraisers = 0;
  for (let i = 0; i < organizations.length; i++) {
    const organization = organizations[i];
    totalActiveFundraisers +=
      parseInt(organization.total_active_fundraisers, 10) || 0;
  }
  console.log("Active Funds", totalActiveFundraisers);

  let totalBooksSold = 0;
  for (let i = 0; i < organizations.length; i++) {
    const organization = organizations[i];
    totalBooksSold += parseInt(organization.total_books_sold, 10) || 0;
  }
  console.log("Books Sold", totalBooksSold);
  const pricePerBook = 25;
  const orgCut = 10;
  const totalMoneyRaised = totalBooksSold * pricePerBook;
  const formattedTotalMoneyRaised = totalMoneyRaised.toLocaleString();

  let totalOrgEarnings = 0;
  for (let i = 0; i < organizations.length; i++) {
    const organization = organizations[i];
    totalOrgEarnings +=
      parseInt(organization.total_org_earnings, 10) || 0;
  }
  
  const totalMinusOrgCut = totalMoneyRaised - totalOrgEarnings;
  const formattedTotalMinusOrg = totalMinusOrgCut.toLocaleString();

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <br />

        {/* <Card
          elevation={2}
          className="headerCard"
          style={{ width: "90%", margin: "auto", marginBotton: "20px" }}
        >
          <CardContent>
            <center>
              <br />
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Welcome, {user.username ? capitalizeWords(user.username) : ""}
              </Typography>
              {user.is_admin ? (
                <>
                  <Typography variant="h6">You are a PSG Admin User</Typography>
                  <br />
                  <div className="fundraisersContainer">
                    <center>
                      <Card
                        elevation={3}
                        className="fundraiserCard"
                        style={{ width: "70%", marginBottom: "10px" }}
                      >
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            style={{ fontWeight: "bold" }}
                          >
                            PSG Details:
                          </Typography>
                          <Typography variant="body2">
                            Total Active Organizations: {totalOrganizations}
                          </Typography>
                          <Typography variant="body2">
                            Total Active Fundraisers: {totalActiveFundraisers}
                          </Typography>
                          <Typography variant="body2">
                          Total Books Sold: {totalBooksSold}
                            </Typography>
                          <Typography variant="body2">
                          Total Money Rasied: ${formattedTotalMoneyRaised}
                          </Typography>
                          <Typography variant="body2">
                          PSG Earnings after Organization Fees: ${formattedTotalMinusOrg}
                          </Typography>
                        </CardContent>
                      </Card>
                    </center>
                  </div>
                </>
              ) : (
                <>
                  {groups.length > 0 ? (
                    <Typography variant="h6">
                      Here are the groups that you are the admin of:
                    </Typography>
                  ) : (
                    <Typography variant="h6">
                      You are not the admin of any groups yet.
                    </Typography>
                  )}
                </>
              )}
            </center>
          </CardContent>
        </Card>
        <br />
        {groups?.map((group, index) => (
          <Card
            key={index}
            className="groupCard"
            style={{ width: "80%", margin: "auto" }}
          >
            <CardContent>
              <center>
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", marginBottom: "10px" }}
                >
                  Group:{" "}
                  {group.group_nickname
                    ? group.group_nickname
                    : "* No group name *"}{" "}
                  in the {group.organization_name} Organization
                </Typography>
              </center>

              <div className="fundraisersContainer">
                {group.fundraisers_info?.map((fundraiser, subIndex) => (
                  <center>
                    <Card
                      elevation={3}
                      key={subIndex}
                      className="fundraiserCard"
                      style={{ width: "70%", marginBottom: "10px" }}
                    >
                      <CardContent>
                        <Typography variant="subtitle1">
                          Fundraiser: {fundraiser.title}
                        </Typography>
                        <Typography variant="body2">
                          Books Requested: {fundraiser.books_requested}
                        </Typography>
                        <Typography variant="body2">
                          Books Sold: {fundraiser.books_sold}
                        </Typography>
                        <Typography variant="body2">
                          Start Date: {formatDate(fundraiser.start_date)}
                        </Typography>
                        <Typography variant="body2">
                          End Date: {formatDate(fundraiser.end_date)}
                        </Typography>
                        <Typography variant="body2">
                          Coupon book Year: {fundraiser.coupon_book_year}
                        </Typography>
                      </CardContent>
                    </Card>
                  </center>
                ))}
              </div>
            </CardContent>
          </Card>
        ))} */}
        <UserTable />
      </div>
    </>
  );
}

export default UserProfile;
