import * as React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, Typography, Box } from "@mui/material";
// ~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~
import ListView from "../ListView/ListView";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { tabWidth } from "../Utils/helpers";
import { border } from "../Utils/colors";

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
        <Box sx={{ p: .5 }}>
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
  setIsMerchantList,
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
    <Box sx={{ width: "100%", ...border }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 5 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Organizations" {...a11yProps(0)} onClick={() => {setIsMerchantList(false)}} sx={tabWidth} />
          <Tab label="Merchants" {...a11yProps(1)} onClick={() => {setIsMerchantList(true)}} sx={tabWidth} />
        </Tabs>
      </Box>
      {organizations.map((organization, index) => (
        <CustomTabPanel key={index} value={value} index={0}>
          <ListView
            data={organization}
            isMerchantList={false}
            onChange={handleEdit}
            editComplete={editComplete}
            setEditComplete={setEditComplete}
          />
        </CustomTabPanel>
      ))}
      {merchants.map((merchant, index) => (
        <CustomTabPanel key={index} value={value} index={1}>
          <ListView
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
