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
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { oSellers } from "../../hooks/reduxStore";
// ~~~~~~~~~~ Component ~~~~~~~~~~
import AddSellerForm from "./AddSellerForm";
import CustomButton from "../CustomButton/CustomButton";
import { errorColor, primaryColor } from "../Utils/colors";
import { border } from "../Utils/colors";
import Typography from "../Typography/Typography";

const columns = [
  { id: "refId", label: "Referral ID", width: 90 },
  { id: "lastname", label: "Last Name", width: 100 },
  {
    id: "firstname",
    label: "First Name",
    align: "right",
    width: 100,
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
    id: "initial_books",
    label: "Initial Book Count",
    align: "right",
    width: 75,
  },
  {
    id: "additional_books",
    label: "Additional Books",
    align: "right",
    width: 75,
  },
  {
    id: "books_returned",
    label: "Returned Books",
    align: "right",
    width: 75,
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
    label: "Digital",
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
  {
    id: "actions",
    label: "Actions",
    align: "right",
  },
];

const evenRowColor = {
  backgroundColor: "#fbfbfb",
};

function generateRefId(firstName, lastName, teacher) {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  const teacherInitials = teacher
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
  // const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit number
  const randomDigits = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit number

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
    const formDataWithId = {
      ...formData,
      organization_id: paramsObject.id,
    };
    console.log(formDataWithId);

    const action = {
      type: "ADD_SELLER",
      payload: formDataWithId,
    };
    console.log("Dispatching action:", action);
    dispatch(action);
    handleClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleArchive = (id) => {
    console.log(id);
  };

  const handleEdit = (id) => {
    console.log(id);
  };

  let isEvenRow = true;

  return (
    <>
      <Typography label="Sellers" variant="h6" sx={{ textAlign: "center" }} />
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~ Add Seller Button ~~~~~~~~ */}
      <div style={{ marginBottom: 10 }}>
        <CustomButton
          label="New Seller"
          variant="contained"
          onClick={handleOpen}
          icon={<AddIcon />}
        />
        <AddSellerForm
          columns={columns}
          open={open}
          handleClose={handleClose}
          handleAddSeller={handleAddSeller}
        />
      </div>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  */}
      {/* ~~~~~~~~~~ Seller Table ~~~~~~~~~~ */}
      <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
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
            <TableBody>
              {sellers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((seller, index) => {
                  isEvenRow = !isEvenRow; // Toggle the variable for each row
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      sx={{
                        ...(isEvenRow
                          ? { backgroundColor: evenRowColor }
                          : null),
                      }}
                    >
                      {columns.map((column) => {
                        const value = seller[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                              border: "1px solid #e0e0e0",
                              padding: "8px",
                              ...(column.id === "notes" && {
                                maxWidth: "250px",
                                maxHeight: "50px",
                                // overflow: "hidden",
                                overflowWrap: "break-word",
                                // textOverflow: "ellipsis",
                              }),
                            }}
                          >
                            {column.id === "actions" ? (
                              <>
                                <EditNoteIcon
                                  sx={{
                                    "&:hover": {
                                      color: "#325CAB",
                                      transition: "transform 0.2s",
                                    },
                                    color: primaryColor.color,
                                  }}
                                  onClick={() => handleEdit(seller.id)}
                                  onMouseOver={(e) =>
                                    (e.currentTarget.style.transform =
                                      "scale(1.1)")
                                  }
                                  onMouseOut={(e) =>
                                    (e.currentTarget.style.transform =
                                      "scale(1)")
                                  }
                                />

                                <ArchiveIcon
                                  sx={{
                                    "&:hover": { color: errorColor.color },
                                    color: primaryColor.color,
                                  }}
                                  onClick={() => handleArchive(seller.id)}
                                />
                              </>
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={sellers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

{
  /* sx={{ '&:last-child td': { border: 0 } }} -- for line 191 */
}
