//Imports used in component
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Typography,
  Container,
  CardContent,
  Paper,
} from "@mui/material";
//Imports used for tables and data
import GroupDetailsCard from "../GroupDetailsCard/GroupDetailsCard";
import ActiveFundraiserItem from "../ActiveFundraiserItem/ActiveFundraiserItem";
import ClosedFundraiserItem from "../ClosedFundraiserItem/ClosedFundraiserItem";
import "./GroupDetails.css";

//Function for the component
export default function GroupDetails() {
  //Used to get the group id number and display the correct fundraiser information
  const id = Number(useParams().id);
  //Instanciates dispatch for use in component
  const dispatch = useDispatch();
  //Store used to get the group and fundraiser data
  const groupDetails = useSelector((store) => store.group);
  const fundraisers = useSelector((store) => store.fundraisers);

  //Use Effect that runs on page load to fetch the group details
  useEffect(() => {
    dispatch({ type: "FETCH_GROUP_DETAILS", payload: id });
  }, []);
  //Use Effect that runs after group details are fetched. Grabs the fundraisers tied to the group id number
  useEffect(() => {
    dispatch({ type: "FETCH_FUNDRAISERS", payload: id });
  }, [groupDetails]);
  //Console logs for testing
  console.log(groupDetails);
  console.log(fundraisers);

  //Elements used in component. Displays data based on the components that are called and has the headers for both open fundraisers and closed fundarisers tables
  return (
    <>
      <Container>
        <br />
        {groupDetails.map((group) => {
          return <GroupDetailsCard key={id} group={group} />;
        })}
      </Container>
      <br />
      <br />
      <Paper
        elevation={6}
        style={{
          margin: "10px",
          padding: "10px",
          paddingBottom: "40px",
          height: "80%",
        }}
      >
        <TableContainer style={{ width: "95%", margin: "auto" }}>
          <Typography variant="h6">Active Campaigns</Typography>
          <Table size="small" className="active-table">
            <TableHead>
              <TableRow style={{ border: "2px solid black" }}>
                <TableCell className="active_header_cell">
                  <Typography
                    className="active_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold", padding: "0" }}
                  >
                    Title
                  </Typography>
                </TableCell>
                <TableCell className="active_header_cell">
                  <Typography
                    className="active_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold", padding: "0" }}
                  >
                    Books Requested
                  </Typography>
                </TableCell>
                <TableCell className="active_header_cell">
                  <Typography
                    className="active_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold", padding: "0" }}
                  >
                    Books Checked Out
                  </Typography>
                </TableCell>
                <TableCell className="active_header_cell">
                  <Typography
                    className="active_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold", padding: "0" }}
                  >
                    Books Out Value
                  </Typography>
                </TableCell>
                <TableCell className="active_header_cell">
                  <Typography
                    className="active_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold", padding: "0" }}
                  >
                    Books Checked In
                  </Typography>
                </TableCell>
                <TableCell className="active_header_cell">
                  <Typography
                    className="active_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold", padding: "0" }}
                  >
                    Books Sold
                  </Typography>
                </TableCell>
                <TableCell className="active_header_cell">
                  <Typography
                    className="active_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold", padding: "0" }}
                  >
                    Money Received
                  </Typography>
                </TableCell>
                <TableCell className="active_header_cell">
                  <Typography
                    className="active_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold", padding: "0" }}
                  >
                    Start Date
                  </Typography>
                </TableCell>
                <TableCell className="active_header_cell">
                  <Typography
                    className="active_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold", padding: "0" }}
                  >
                    End Date
                  </Typography>
                </TableCell>
                <TableCell className="active_header_cell">
                  <Typography
                    className="active_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold", padding: "0" }}
                  >
                    Year
                  </Typography>
                </TableCell>
                <TableCell className="active_header_cell">
                  <Typography
                    className="active_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold", padding: "0" }}
                  >
                    Goal
                  </Typography>
                </TableCell>
                <TableCell className="active_header_cell">
                  <Typography
                    className="active_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold", padding: "0" }}
                  >
                    Outstanding Balance
                  </Typography>
                </TableCell>
                <TableCell className="active_header_cell">
                  <Typography
                    className="active_header_text"
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: "0"
                    }}
                  >
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fundraisers.map((fundraiser) => {
                return (
                  <ActiveFundraiserItem
                    key={fundraiser.id}
                    fundraiser={fundraiser}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <br />
        <TableContainer style={{ width: "95%", margin: "auto" }}>
          <Typography variant="h6">Closed Campaigns</Typography>
          <Table size="small">
            <TableHead>
              <TableRow style={{ border: "2px solid black", width: "80%" }}>
                <TableCell
                  className="closed_header_cell"
                  style={{ width: "20px" }}
                >
                  <Typography
                    className="closed_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                    variant="body2"
                  >
                    Title
                  </Typography>
                </TableCell>
                <TableCell
                  className="closed_header_cell"
                  style={{ width: "10px" }}
                >
                  <Typography
                    className="closed_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                    variant="body2"
                  >
                    Books Requested
                  </Typography>
                </TableCell>
                <TableCell
                  className="closed_header_cell"
                  style={{ width: "10px" }}
                >
                  <Typography
                    className="closed_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                    variant="body2"
                  >
                    Books Sold
                  </Typography>
                </TableCell>
                <TableCell
                  className="closed_header_cell"
                  style={{ width: "10px" }}
                >
                  <Typography
                    className="closed_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                    variant="body2"
                  >
                    Money Received
                  </Typography>
                </TableCell>
                <TableCell
                  className="closed_header_cell"
                  style={{ width: "10px" }}
                >
                  <Typography
                    className="closed_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                    variant="body2"
                  >
                    Start Date
                  </Typography>
                </TableCell>
                <TableCell
                  className="closed_header_cell"
                  style={{ width: "10px" }}
                >
                  <Typography
                    className="closed_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                    variant="body2"
                  >
                    End Date
                  </Typography>
                </TableCell>
                <TableCell
                  className="closed_header_cell"
                  style={{ width: "10px" }}
                >
                  <Typography
                    className="closed_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                    variant="body2"
                  >
                    Year
                  </Typography>
                </TableCell>
                <TableCell
                  className="active_header_cell"
                  style={{ width: "10px" }}
                >
                  <Typography
                    className="active_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  >
                    Goal
                  </Typography>
                </TableCell>
                <TableCell
                  className="closed_header_cell"
                  style={{ width: "10px" }}
                >
                  <Typography
                    className="closed_header_text"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                    variant="body2"
                  >
                    Outstanding Balance
                  </Typography>
                </TableCell>
                <TableCell
                  className="active_header_cell"
                  style={{ width: "10px" }}
                >
                  <Typography
                    className="active_header_text"
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fundraisers.map((fundraiser) => {
                return (
                  <ClosedFundraiserItem
                    key={fundraiser.id}
                    fundraiser={fundraiser}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
