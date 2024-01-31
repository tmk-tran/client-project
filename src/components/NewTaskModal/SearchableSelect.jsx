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
      onChange={(event, value) => {
        console.log(value.organization_name);
        console.log(value.merchant_name);
        merchantTab ? handleAccountChange(event, value.merchant_name) : handleAccountChange(event, value.organization_name);
        // handleAccountChange(event, value.organization_name);
      }}
      options={merchantTab ? merchants : organizations}
      getOptionLabel={(option) => {
        // console.log(
        //   "Option Label:",
        //   merchantTab ? option.merchant_name : option.organization_name
        // );
        console.log(option);
        console.log(merchantTab);
        console.log(option);
        // return merchantTab ? option.merchant_name : option.organization_name;
        return option;
      }}
      renderInput={(params) => {
        console.log(params);
        console.log("Input Value:", params.inputProps.value);
        
        return (
          <TextField
            {...params}
            placeholder={params.inputProps.value ? params.inputProps.value : "Account Name"}
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
