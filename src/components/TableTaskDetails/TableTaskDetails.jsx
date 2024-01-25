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
// ~~~~~~~~~~ Component ~~~~~~~~~
import CommentDisplay from "../CommentDisplay/CommentDisplay";

export default function TableTaskDetails() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                border: "1px solid red",
                // margin: 0,
              }}
            >
              Task #
            </Typography>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Status:
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Status Listed Here
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Due:
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Due Date Goes Here
            </Typography>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={2}>
            <CommentDisplay />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
