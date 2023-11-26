import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
} from "@mui/material";
import { capitalizeWords, centerStyle, formatDate } from "../Utils/helpers";

export default function TableGroupDetails({ fundraiser }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={centerStyle}>
            <strong>Fundraiser End Date:</strong>
          </TableCell>
          <TableCell>{formatDate(fundraiser.end_date)}</TableCell>
          {/* <TableCell><Typography sx={{ fontWeight: "bold" }}>Goals</Typography></TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell style={centerStyle}>
            <Typography variant="caption">Money Received:</Typography>
          </TableCell>
          <TableCell>
            {fundraiser.money_received}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
