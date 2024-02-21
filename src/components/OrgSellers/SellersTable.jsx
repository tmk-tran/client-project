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
import SellerForm from "./SellerForm";
import CustomButton from "../CustomButton/CustomButton";
import Typography from "../Typography/Typography";
import ActionIcons from "./ActionIcons";
import { errorColor, primaryColor } from "../Utils/colors";
import { border } from "../Utils/colors";

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
  const [mode, setMode] = useState("add");
  console.log(mode);
  const [sellerToEdit, setSellerToEdit] = useState(null);

  useEffect(() => {
    dispatch({ type: "FETCH_SELLERS", payload: paramsObject.id });
  }, []);

  const sellers = oSellers() || [];
  console.log(sellers);

  const handleOpen = (mode) => {
    setMode(mode);
    setOpen(true);
  };

  const handleEditOpen = (id, mode) => {
    console.log(id);
    console.log(mode);

    const sellerToEdit = sellers.find((seller) => seller.id === id);
    console.log(sellerToEdit);
    if (sellerToEdit) {
      setSellerToEdit(sellerToEdit);
      setMode(mode);
      setOpen(true);
    }
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
    // dispatch(action);
    handleClose();
  };

  const handleEditSeller = (editedSeller) => {
    console.log(editedSeller);
    console.log(editedSeller.id);

    const editAction = {
      type: "EDIT_SELLER",
      payload: editedSeller,
    };
    console.log("Dispatching action:", editAction);
    dispatch(editAction);
    // handleClose();
  };

  const handleArchive = (sellerId) => {
    console.log(sellerId);
    const orgId = paramsObject.id;
    console.log(orgId);

    const archiveAction = {
      type: "ARCHIVE_SELLER",
      payload: { sellerId, orgId },
    };
    console.log("Dispatching action:", archiveAction);
    dispatch(archiveAction);
    // handleClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
          // onClick={handleOpen}
          onClick={() => handleOpen("add")}
          icon={<AddIcon />}
        />
        <SellerForm
          columns={columns}
          open={open}
          mode={mode}
          handleClose={handleClose}
          handleAddSeller={handleAddSeller}
          handleEditSeller={handleEditSeller}
          sellerToEdit={sellerToEdit}
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
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~ Table Body ~~~~~~~~~~ */}
            <TableBody>
              {sellers
                .filter((seller) => !seller.is_deleted) // Filter out deleted sellers
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
                            {/* ~~~~~ Action Icons ~~~~~ */}
                            {column.id === "actions" ? (
                              <ActionIcons
                                seller={seller}
                                onEdit={(id) => handleEditOpen(id, "edit")}
                                handleArchive={handleArchive}
                              />
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
