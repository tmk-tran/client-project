import React, { useState } from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";
import {
  capitalizeFirstWord,
  capitalizeStateAbbr,
  capitalizeWords,
  formatPhoneNumber,
} from "../Utils/helpers";

export default function LocationSelect({ label, locations, fullWidth }) {
  console.log(locations);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        value={selectedLocation}
        onChange={handleLocationChange}
        // displayEmpty
        fullWidth={fullWidth}
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>
          Please choose a location...
        </MenuItem>
        {locations
          .filter((location) => !location.is_deleted)
          .map((location, i) => (
            <MenuItem key={i} value={location.location_name}>
              {capitalizeFirstWord(location.location_name)}
              <br />
              {capitalizeWords(location.address)}{" "}
              {capitalizeWords(location.city)},{" "}
              {capitalizeStateAbbr(location.state)}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
}
