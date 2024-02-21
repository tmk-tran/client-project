import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Grid, Divider } from "@mui/material";
import { lineDivider } from "../Utils/modalStyles";
import { primaryColor } from "../Utils/colors";
import ModalButtons from "../Modals/ModalButtons";
import Typography from "../Typography/Typography";
import { capitalizeFirstWord, capitalizeWords } from "../Utils/helpers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const dividerStyle = {
  backgroundColor: primaryColor.color,
  mb: 2,
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

const sample = generateRefId("susie", "larson", "ms jones");
console.log(sample);

export default function SellerForm({
  columns,
  open,
  mode,
  handleClose,
  handleAddSeller,
  handleEditSeller,
  sellerToEdit,
}) {
  console.log(sellerToEdit);

  const initialFormState = columns.reduce((acc, column) => {
    acc[column.id] = [
      "initial_books",
      "additional_books",
      "books_returned",
      "cash",
      "checks",
      "digital",
      "donations",
    ].includes(column.id)
      ? 0
      : "";
    return acc;
  }, {});
  console.log(initialFormState);

  const [formData, setFormData] = useState(initialFormState);
  console.log(formData);

  useEffect(() => {
    if (mode === "edit") {
      setFormData(sellerToEdit);
    } else {
      setFormData(initialFormState);
    }
  }, [mode, sellerToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const capitalizeValue =
      name === "firstname" ||
      name === "lastname" ||
      name === "level" ||
      name === "teacher"
        ? capitalizeWords(value)
        : name === "notes"
        ? capitalizeFirstWord(value)
        : value;

    console.log(name, capitalizeValue);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: capitalizeValue,
    }));
  };

  const handleFormSubmit = () => {
    let updatedFormData = { ...formData };

    if (mode === "add") {
      // Check if refId is an empty string or does not exist
      if (!updatedFormData.refId) {
        const refId = generateRefId(
          updatedFormData["firstname"],
          updatedFormData["lastname"],
          updatedFormData["teacher"]
        );
        updatedFormData.refId = refId; // Assign the new refId
      }
      handleAddSeller(updatedFormData);
    } else if (mode === "edit") {
      // Edit logic remains the same
      // No need to generate or alter refId for editing
      handleEditSeller(updatedFormData);
    }

    console.log(updatedFormData);
    setFormData(initialFormState);
    handleClose();
  };

  const handleFormReset = () => {
    setFormData(initialFormState);
    handleClose();
  };

  return (
    <Modal open={open} mode={mode} onClose={handleFormReset}>
      <Box sx={style}>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* ~~~~~ Header ~~~~~~~~~~ */}
        {mode === "add" && (
          <Typography
            label="New Seller"
            variant="h6"
            sx={{ textAlign: "center", mb: 2 }}
          />
        )}
        {mode === "edit" && (
          <Typography
            label="Edit Seller"
            variant="h6"
            sx={{ textAlign: "center", mb: 2 }}
          />
        )}
        <Divider sx={lineDivider} />
        <form>
          <Grid container spacing={2}>
            {/* ~~~~~ Top Section ~~~~~ */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="lastname"
                    label="Last Name"
                    value={formData["lastname"]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="firstname"
                    label="First Name"
                    value={formData["firstname"]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="level"
                    label="Level / Grade"
                    value={formData["level"]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="teacher"
                    label="Lead / Teacher"
                    value={formData["teacher"]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* ~~~~~ Second Section ~~~~~ */}
            <Grid item xs={12}>
              <Divider sx={dividerStyle} />
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    name="initial_books"
                    label="Initial Book Count"
                    value={formData["initial_books"]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="additional_books"
                    label="Additional Books"
                    value={formData["additional_books"]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="books_returned"
                    label="Books Returned"
                    value={formData["books_returned"]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* ~~~~~ Third Section ~~~~~ */}
            <Grid item xs={12}>
              <Divider sx={dividerStyle} />
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    name="digital"
                    label="Digital Payments"
                    value={formData["digital"]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    type="number"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name="donations"
                    label="Donations"
                    value={formData["donations"]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    type="number"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name="checks"
                    label="Checks"
                    value={formData["checks"]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    type="number"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name="cash"
                    label="Cash"
                    value={formData["cash"]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* ~~~~~ Fourth Section ~~~~~ */}
            <Grid item xs={12}>
              <Divider sx={dividerStyle} />
              <TextField
                name="notes"
                label="Notes"
                value={formData["notes"]}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
                size="small"
              />
            </Grid>
          </Grid>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ Buttons ~~~~~~~~~~ */}
          <ModalButtons
            label={mode === "add" ? "Add" : "Update"}
            variant="contained"
            color="primary"
            onSave={handleFormSubmit}
            onCancel={handleFormReset}
            sx={{ mt: 2 }}
            width="50%"
          />
        </form>
      </Box>
    </Modal>
  );
}
