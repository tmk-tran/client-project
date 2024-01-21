import React, { useState } from "react";
import PropTypes from "prop-types";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Tab, Tabs, Box } from "@mui/material";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import SearchBar from "../SearchBar/SearchBar";
import TaskListOrg from "../TaskList/TaskListOrg";
import TaskListMerchant from "../TaskList/TaskListMerchant";
import NewTaskModal from "../NewTaskModal/NewTaskModal";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
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

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [merchantTab, setMerchantTab] = useState(false);
  console.log(merchantTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Reset the merchantTab state when "Organization" tab is selected
    if (newValue === 0) {
      setMerchantTab(false);
    }
  };

  return (
    <Box
      sx={{ width: "60vw", margin: "0 auto", height: "80vh", padding: "40px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
          marginBottom: 3,
          paddingY: 2,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Organization" {...a11yProps(0)} />
          <Tab
            label="Merchant"
            {...a11yProps(1)}
            onClick={() => setMerchantTab(true)}
          />
          <Tab label="Coupons" {...a11yProps(2)} />
        </Tabs>
        <NewTaskModal merchantTab={merchantTab} />
        <SearchBar />
      </Box>

      <TabPanel value={value} index={0}>
        <TaskListOrg />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <TaskListMerchant />
      </TabPanel>

      <TabPanel value={value} index={2}>
        Review / Publish info here
      </TabPanel>
    </Box>
  );
}
