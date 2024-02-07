import * as React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, Typography, Box } from "@mui/material";
// ~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~
import ListView from "../ListView/ListView";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  isMerchantList,
  organizations,
  merchants,
  handleEdit,
  editComplete,
  setEditComplete,
}) {
  console.log(isMerchantList);
  console.log(organizations);
  console.log(merchants);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Organizations" {...a11yProps(0)} />
          <Tab label="Merchants" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {organizations.map((organization, index) => (
        <CustomTabPanel value={value} index={0}>
          <ListView
            key={index}
            data={organization}
            isMerchantList={false}
            onChange={handleEdit}
            editComplete={editComplete}
            setEditComplete={setEditComplete}
          />
        </CustomTabPanel>
      ))}
      {merchants.map((merchant, index) => (
        <CustomTabPanel value={value} index={1}>
          <ListView
            key={index}
            data={merchant}
            isMerchantList={true}
            onChange={handleEdit}
            editComplete={editComplete}
            setEditComplete={setEditComplete}
          />
        </CustomTabPanel>
      ))}
      {/* <CustomTabPanel value={value} index={0}>
        Org data
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Merchant data
      </CustomTabPanel> */}
    </Box>
  );
}
