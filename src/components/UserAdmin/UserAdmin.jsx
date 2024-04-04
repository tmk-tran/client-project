import {
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

export default function UserAdmin() {
  return (
    <div style={{ minHeight: "80vh" }}>
      <Table>
        {/* ~~~~~~~~~~ HEAD ~~~~~~~~~~ */}
        <TableHead>
          <TableRow>
            <TableCell>Header 1</TableCell>
            <TableCell>Header 2</TableCell>
            <TableCell>Header 3</TableCell>
            <TableCell>Header 4</TableCell>
          </TableRow>
        </TableHead>
        {/* ~~~~~~~~~~ BODY ~~~~~~~~~~ */}
        <TableBody>
          <TableRow>
            <TableCell>Row 1, Col 1</TableCell>
            <TableCell>Row 1, Col 2</TableCell>
            <TableCell>Row 1, Col 3</TableCell>
            <TableCell>Row 1, Col 4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2, Col 1</TableCell>
            <TableCell>Row 2, Col 2</TableCell>
            <TableCell>Row 2, Col 3</TableCell>
            <TableCell>Row 2, Col 4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 3, Col 1</TableCell>
            <TableCell>Row 3, Col 2</TableCell>
            <TableCell>Row 3, Col 3</TableCell>
            <TableCell>Row 3, Col 4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 4, Col 1</TableCell>
            <TableCell>Row 4, Col 2</TableCell>
            <TableCell>Row 4, Col 3</TableCell>
            <TableCell>Row 4, Col 4</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
