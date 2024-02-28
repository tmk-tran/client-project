import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

export const columns = [
  { id: "refId", label: "Referral ID" },
  { id: "lastname", label: "Last Name" },
  {
    id: "firstname",
    label: "First Name",
    align: "right",
  },
  { id: "transactions", label: "Transactions", align: "right" },
  { id: "purchases", label: "Purchases", align: "right" },
];

export default function UrlTableView() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              sx={{
                minWidth: column.minWidth,
                width: column.width,
                height: 50,
                wordWrap: "break-word",
                border: "1px solid #f0f0f0",
                backgroundColor: "#d9d9d9",
                lineHeight: 1,
                fontSize: "1.1rem",
              }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>2</TableCell>
          <TableCell>3</TableCell>
          <TableCell>4</TableCell>
          <TableCell>5</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
