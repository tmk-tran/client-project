import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import { border } from "../Utils/colors";

export default function OrderTable({ rows, selectedRows, handleRowSelect }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Select</TableCell>
          <TableCell>Book Type</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(row.id)}
                onChange={() => handleRowSelect(row.id)}
              />
            </TableCell>
            <TableCell>{row.bookType}</TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>
              <TextField
                type="number"
                defaultValue={row.quantity}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </TableCell>
            <TableCell sx={border}>{row.price * row.quantity}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={3} sx={{ border: "none" }} />
          <TableCell align="right" sx={{ border: "none" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Subtotal:
            </Typography>
          </TableCell>
          <TableCell align="left" sx={{ border: "none" }}>
            <Typography variant="h6">
              ${rows.reduce((acc, row) => acc + row.price * row.quantity, 0)}
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
