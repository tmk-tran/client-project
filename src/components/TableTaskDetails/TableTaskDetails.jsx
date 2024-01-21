import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
} from "@mui/material";

export default function TableTaskDetails() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2}>
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
              Status Goes Here
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell>
            <Typography sx={{ fontWeight: "bold" }}>Due:</Typography>
          </TableCell>
          <TableCell>
            <Typography sx={{ fontWeight: "bold" }}>
              Due Date Goes Here
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
