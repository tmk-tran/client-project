import React, { useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { border } from "../Utils/colors";

export default function AddFileButton({ filename, onFileSelect }) {
  console.log(filename);
  const [file, setFile] = useState(null);
  console.log(file);
  //   console.log(file.name);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    console.log(uploadedFile);
    setFile(uploadedFile);
    onFileSelect(uploadedFile);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
      <input
        // type="file"
        // accept="image/*"
        type="file"
        accept="application/pdf, image/*"
        style={{ display: "none" }}
        id="file-upload"
        onChange={handleFileChange}
      />
      {/* <label htmlFor="file-upload">
        <Button variant="contained" component="span" sx={{ height: "100%" }}>
          <FileUploadIcon />
          &nbsp;Logo
        </Button>
      </label> */}
      {/* <TextField
        disabled
        fullWidth
        value={file ? file.name : ""}
        label="File Name"
        variant="outlined"
        margin="normal"
      /> */}
      <TextField
        disabled
        fullWidth
        value={file ? file.name : filename ? filename : "No uploaded logo"}
        // onChange={(e) =>
        //   handleChange("organization_logo", e.target.value)
        // }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <label htmlFor="file-upload">
                <Button
                  variant="contained"
                  component="span"
                  sx={{ height: "100%" }}
                >
                  <FileUploadIcon />
                  &nbsp;Logo
                </Button>
              </label>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
