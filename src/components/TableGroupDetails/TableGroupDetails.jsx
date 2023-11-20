import React from "react";
import { Table, TableBody, TableRow, TableCell, TableHead } from "@mui/material";
import { capitalizeWords, centerStyle } from "../Utils/helpers";

export default function TableGroupDetails({ groupInfo }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={centerStyle}>
            <strong>Department:</strong>
          </TableCell>
          <TableCell>{capitalizeWords(groupInfo.department)}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell style={centerStyle}>
            <strong>Division:</strong>
          </TableCell>
          <TableCell>
            {groupInfo.sub_department
              ? capitalizeWords(groupInfo.sub_department)
              : "N/A"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
