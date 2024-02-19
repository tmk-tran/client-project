import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { oSellers } from "../../hooks/reduxStore";
// ~~~~~~~~~~ Component ~~~~~~~~~~
import AddSellerForm from "./AddSellerForm";

const columns = [
  { id: "refId", label: "Referral ID" },
  { id: "lastname", label: "Last Name" },
  {
    id: "firstname",
    label: "First Name",
    align: "right",
  },
  {
    id: "level",
    label: "Level / Grade",
    align: "right",
  },
  {
    id: "teacher",
    label: "Lead / Teacher",
    align: "right",
  },
  {
    id: "initialbooks",
    label: "Initial Book Count",
    align: "right",
  },
  {
    id: "additionalbooks",
    label: "Additional Books Count",
    align: "right",
  },
  {
    id: "booksreturned",
    label: "Books Returned",
    align: "right",
  },
  {
    id: "cash",
    label: "Cash",
    align: "right",
  },
  {
    id: "checks",
    label: "Checks",
    align: "right",
  },
  {
    id: "digital",
    label: "Digital Payments",
    align: "right",
  },
  {
    id: "donations",
    label: "Donations",
    align: "right",
  },
  {
    id: "notes",
    label: "Notes",
    align: "right",
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

function generateRefId(firstName, lastName, teacher) {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  const teacherInitials = teacher
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit number

  return `${firstInitial}${lastInitial}${teacherInitials}${randomDigits}`;
}

// Example usage
const firstName = "John";
const lastName = "Doe";
const teacher = "Jane Smith";
const refId = generateRefId(firstName, lastName, teacher);
console.log(refId);

export default function StickyHeadTable() {
  const dispatch = dispatchHook();
  const paramsObject = useParams();
  console.log(paramsObject);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: "FETCH_SELLERS", payload: paramsObject.id });
  }, []);

  const sellers = oSellers() || [];
  console.log(sellers);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSeller = (formData) => {
    console.log(formData);

    // dispatch({ type: "ADD_SELLER", payload: formData });
    const action = {
      type: "ADD_SELLER",
      payload: formData,
    };
    console.log("Dispatching action:", action);
    // dispatch(action);
    handleClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((seller) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={seller.id}>
                    {columns.map((column) => {
                      const value = seller[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Seller
      </Button>
      <AddSellerForm columns={columns} open={open} handleClose={handleClose} handleAddSeller={handleAddSeller} />
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
