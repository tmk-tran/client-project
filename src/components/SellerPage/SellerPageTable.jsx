import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { columns } from "../OrgSellers/SellersTable";

export default function SellerPageTable({ sellerInfo }) {
  console.log(sellerInfo);
  if (!sellerInfo || sellerInfo.length === 0) {
    return <Typography>No data available</Typography>;
  }

  const info = Object.keys(sellerInfo[0]);

  return (
    <Table>
      {/* ~~~~~~~~~~ HEAD ~~~~~~~~~~ */}
      <TableHead>
        <TableRow>
          {columns
            .filter((column) => column.id !== "notes") // Exclude the "notes" column
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
            {info.map((field) => {
              return field !== "id" && field !== "organization_id" ? (
                <TableCell key={field}>{seller[field]}</TableCell>
              ) : null;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
