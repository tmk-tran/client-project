import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import { lineDivider } from "../Utils/modalStyles";
import ModalButtons from "../Modals/ModalButtons";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const generateRefId = (firstName, lastName, teacher) => {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  const teacherInitials = teacher
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit number

  return `${firstInitial}${lastInitial}${teacherInitials}${randomDigits}`;
};

export default function AddSellerForm({
  columns,
  open,
  handleClose,
  handleAddSeller,
}) {
  console.log(columns);

  const initialFormState = columns.reduce((acc, column) => {
    acc[column.id] = ["initialbooks", "additionalbooks", "booksreturned", "cash", "checks", "digital", "donations"].includes(column.id) ? 0 : "";
    return acc;
  }, {});
  
  const [formData, setFormData] = useState(initialFormState);
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    const refId = generateRefId(
      formData["firstname"],
      formData["lastname"],
      formData["teacher"]
    );
    handleAddSeller({ ...formData, refId });
    setFormData(initialFormState);
    handleClose();
  };

  // Remove the "refId" column from the form fields
  const filteredColumns = columns.filter((column) => column.id !== "refId");

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          New Seller
        </Typography>
        <Divider sx={lineDivider} />
        <form>
          <Grid container spacing={2}>
            {filteredColumns.map((column) => (
              <Grid item xs={12} sm={6} key={column.id}>
                {/* <TextField
                  name={column.id}
                  label={column.label}
                  value={formData[column.id]}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                /> */}
                <TextField
                  name={column.id}
                  label={column.label}
                  value={formData[column.id]}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  type={
                    [
                      "initialbooks",
                      "additionalbooks",
                      "booksreturned",
                      "cash",
                      "checks",
                      "digital",
                      "donations",
                    ].includes(column.id)
                      ? "number"
                      : "text"
                  }
                />
              </Grid>
            ))}
          </Grid>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ Buttons ~~~~~~~~~~ */}
          <ModalButtons
            label="Add"
            variant="contained"
            color="primary"
            onSave={handleFormSubmit}
            onCancel={handleClose}
            sx={{ mt: 2 }}
            width="50%"
          />
        </form>
      </Box>
    </Modal>
  );
}
