import React from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
} from "@mui/material";
import "./TableTaskDetails.css";

export default function TableTaskDetails() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2} className="task-row-shading">
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                border: "1px solid red",
              }}
            >
              Task #
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography sx={{ fontWeight: "bold" }}>Status:</Typography>
          </TableCell>
          <TableCell>
            <Typography sx={{ fontWeight: "bold" }}>
              Status Listed Here
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell className="task-row-shading">
            <Typography sx={{ fontWeight: "bold" }}>Due:</Typography>
          </TableCell>
          <TableCell className="task-row-shading">
            <Typography sx={{ fontWeight: "bold" }}>
              Due Date Goes Here
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                border: "1px solid red",
              }}
            >
              Most recent comment here
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
