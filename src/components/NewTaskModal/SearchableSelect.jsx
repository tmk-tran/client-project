// import React from "react";
// import { Autocomplete, TextField } from "@mui/material";

// const names = [
//   "John Doe",
//   "Jane Doe",
//   "Alice Smith",
//   "Bob Johnson",
//   // ... add more names as needed
// ];

// export default function SearchableSelect() {
//   return (
//     <Autocomplete
//       options={names}
//       renderInput={(params) => (
//         <TextField {...params} label="Select a Name" variant="outlined" />
//       )}
//     />
//   );
// }

import React from "react";
import { Autocomplete, TextField, MenuItem } from "@mui/material";

// Assuming merchants and organizations are arrays with objects having 'id' and 'merchant_name' or 'organization_name' properties.
// Adjust the structure based on your actual data.

export default function YourComponent({
  thirdMenuChoice,
  handleAccountChange,
  merchantTab,
  merchants,
  organizations,
}) {
  console.log(thirdMenuChoice);
  console.log(merchantTab);
  console.log(merchants);
  console.log(organizations);
  return (
    <Autocomplete
      value={thirdMenuChoice !== "" ? thirdMenuChoice : null}
      onChange={(event, value) => handleAccountChange(event, value)}
      options={merchantTab ? merchants : organizations}
      getOptionLabel={(option) => {
        console.log(
          "Option Label:",
          merchantTab ? option.merchant_name : option.organization_name
        );
        console.log(merchantTab);
        console.log(option);
        return merchantTab ? option.merchant_name : option.organization_name;
      }}
      renderInput={(params) => {
        console.log("Input Value:", params.inputValue);
        return (
          <TextField
            {...params}
            placeholder={params.inputValue ? params.inputValue : "Account Name"}
            variant="outlined"
          />
        );
      }}
      sx={{ margin: "5px 0" }}
      renderOption={(props, option) => (
        <MenuItem {...props}>
          {merchantTab ? option.merchant_name : option.organization_name}
        </MenuItem>
      )}
    />
  );
}
