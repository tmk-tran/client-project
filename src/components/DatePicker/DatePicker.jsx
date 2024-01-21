import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { InputLabel } from "@mui/material";

export default function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <InputLabel>Due:</InputLabel>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          // label="Date"
          slotProps={{
            textField: { placeholder: "Date Here...", sx: { width: "100%" } },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
