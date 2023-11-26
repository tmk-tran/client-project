import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
} from "@mui/material";
import { centerStyle, formatDate } from "../Utils/helpers";
import "./TableGroupDetails.css";

export default function TableGroupDetails({ fundraiser, totalGoals }) {
  return (
    <Table className="custom-table">
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h6" sx={{ textAlign: "center", mb: 1, mt: 1 }}>
              Total Goal:
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">
              {totalGoals > 0 ? (
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0, // Set this to 2 if you want cents
                }).format(totalGoals)
              ) : (
                <span>No Active Fundraiser</span>
              )}
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Typography variant="body2">Money Received:</Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0, // Set this to 2 if you want cents
              }).format(fundraiser.money_received)}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography>Fundraiser End Date:</Typography>
          </TableCell>
          <TableCell>
            <Typography sx={{ fontWeight: "bold" }}>
              {formatDate(fundraiser.end_date)}
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
