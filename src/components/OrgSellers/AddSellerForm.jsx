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
import { primaryColor } from "../Utils/colors";

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

export default function AddSellerForm({
  columns,
  open,
  handleClose,
  handleAddSeller,
}) {
  console.log(columns);

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
  console.log(formData["notes"]);

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

  const handleFormReset = () => {
    setFormData(initialFormState);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleFormReset}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          New Seller
        </Typography>
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
                    name="initialbooks"
                    label="Initial Book Count"
                    value={formData["initialbooks"]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="additionalbooks"
                    label="Additional Books"
                    value={formData["additionalbooks"]}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="booksreturned"
                    label="Books Returned"
                    value={formData["booksreturned"]}
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
                    name="cash"
                    label="Cash"
                    value={formData["cash"]}
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
                rows={4}
                size="small"
              />
            </Grid>
          </Grid>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~ Buttons ~~~~~~~~~~ */}
          <ModalButtons
            label="Add"
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
