import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  capitalizeFirstWord,
  capitalizeStateAbbr,
  capitalizeWords,
  formatPhoneNumber,
} from "../Utils/helpers";

const tableHeaderStyle = {
  minWidth: 150,
};
const tableCellStyle = {
  whiteSpace: "normal",
  minWidth: 150,
};

export default function MyTable({ data, isEditing }) {
  console.log(data);
  // const [isEditing, setIsEditing] = useState(false);
  console.log(isEditing);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {/* <TableCell style={tableHeaderStyle}>Name</TableCell> */}
          <TableCell style={tableHeaderStyle}>Address</TableCell>
          <TableCell style={tableHeaderStyle}>Contact Number</TableCell>
          <TableCell style={tableHeaderStyle}>Additional Details</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {/* ~~~~~~~~~ NAME ~~~~~~~~~ */}
          {/* <TableCell style={tableCellStyle}>
            {capitalizeWords(data.location_name)}
          </TableCell> */}
          {/* ~~~~~~~~~ ADDRESS ~~~~~~~~~ */}
          <TableCell style={tableCellStyle}>
            {capitalizeWords(data.address)}
            <br />
            {capitalizeFirstWord(data.city)}, {capitalizeStateAbbr(data.state)}{" "}
            {data.zip}
          </TableCell>
          {/* ~~~~~~~~~ PHONE ~~~~~~~~~ */}
          <TableCell style={tableCellStyle}>
            {formatPhoneNumber(data.phone_number)}
          </TableCell>
          {/* ~~~~~~~~~ ADDITIONAL DETAILS ~~~~~~~~~ */}
          <TableCell
            style={{
              whiteSpace: "normal",
              minWidth: 200,
              maxWidth: 200,
            }}
          >
            {data.additional_details ? (
              <>{capitalizeFirstWord(data.additional_details)}</>
            ) : (
              "None Entered"
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
