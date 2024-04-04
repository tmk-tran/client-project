import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const OrgMenu = ({ organizations, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);
  console.log(value);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <FormControl fullWidth>
      {!defaultValue && (
        <InputLabel shrink={false}>Select Organization</InputLabel>
      )}
      <Select value={value} onChange={handleChange} sx={{ height: 40 }}>
        {organizations.map((org) => (
          <MenuItem key={org.id} value={org.id}>
            {org.organization_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default OrgMenu;
