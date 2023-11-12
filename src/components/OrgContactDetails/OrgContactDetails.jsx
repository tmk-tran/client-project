import React from "react";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatPhoneNumber } from "../Utils/helpers";

function OrgContactDetails({ info }) {
  const contactPhone = formatPhoneNumber(info.primary_contact_phone);

  return (
    <div className="org-details" style={{ border: "1px solid black" }}>
      <Typography variant="h6">{info.organization_name}</Typography>
      <Typography>{info.address}</Typography>
      <Typography>{info.city}</Typography>
      <Typography>{info.state}</Typography>
      <Typography>{info.zip}</Typography>
      <div>
        <Typography>{info.primary_contact_first_name}</Typography>
        <Typography>{info.primary_contact_last_name}</Typography>
        <Typography>{contactPhone}</Typography>
        <Typography>{info.primary_contact_email}</Typography>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Primary Contact First Name </TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">asfkn</TableCell>
              <TableCell align="right">scaf</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default OrgContactDetails;
