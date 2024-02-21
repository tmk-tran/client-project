import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
} from "@mui/material";
import { columns } from "../OrgSellers/SellersTable";
import CashUpdateModal from "./CashUpdateModal";

export default function SellerPageTable({ sellerInfo }) {
  console.log(sellerInfo);
  console.log(columns);
  if (!sellerInfo || sellerInfo.length === 0) {
    return <Typography>No data available</Typography>;
  }

  const info = Object.keys(sellerInfo[0]);
  console.log(info);

  return (
    <Paper>
      <TableContainer>
        <Table>
          {/* ~~~~~~~~~~ HEAD ~~~~~~~~~~ */}
          <TableHead>
            <TableRow>
              {columns
                .filter(
                  (column) => column.id !== "notes" && column.id !== "actions"
                ) // Exclude the "notes" and "actions" column
                .map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                      minWidth: column.minWidth,
                      width: column.width,
                      height: 50,
                      wordWrap: "break-word",
                      border: "1px solid #f0f0f0",
                      backgroundColor: "#d9d9d9",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          {/* ~~~~~~~~~~ BODY ~~~~~~~~~~ */}
          <TableBody>
            {sellerInfo.map((seller, i) => (
              <TableRow key={i}>
                {columns
                  .filter(
                    (column) => column.id !== "notes" && column.id !== "actions"
                  ) // Exclude the "notes" and "actions" column
                  .map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {seller[column.id]}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
