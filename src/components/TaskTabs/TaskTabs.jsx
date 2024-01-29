import React, { useState } from "react";
import PropTypes from "prop-types";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Tab, Tabs, Box, Typography, Card, CardContent } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import SearchBar from "../SearchBar/SearchBar";
import TaskListOrg from "../TaskList/TaskListOrg";
import TaskListMerchant from "../TaskList/TaskListMerchant";
import NewTaskModal from "../NewTaskModal/NewTaskModal";
import { border } from "../Utils/colors";
import { historyHook } from "../../hooks/useHistory";
import { dispatchHook } from "../../hooks/useDispatch";

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
  const dispatch = dispatchHook();
  const history = historyHook();
  const [value, setValue] = useState(0);
  const [merchantTab, setMerchantTab] = useState(false);

  const styleTaskHeaders = {
    fontWeight: "bold",
    mb: 5,
  };

  const tabWidth = {
    width: "25vw",
  };

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  //   // Reset the merchantTab state when "Organization" tab is selected
  //   if (newValue === 0) {
  //     setMerchantTab(false);
  //   }
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  
    if (newValue === 0) {
      setMerchantTab(false);
      // Dispatch action for fetching organization tasks
      dispatch({ type: "FETCH_ALL_ORGANIZATION_TASKS" });
    } else {
      setMerchantTab(true);
      // Dispatch action for fetching merchant tasks
      dispatch({ type: "FETCH_ALL_MERCHANT_TASKS" });
    }
  };
  

  return (
    <Card className="details-card" elevation={3}>
      <CardContent>
        <Box
          sx={{
            width: "60vw",
            margin: "0 auto",
            height: "80vh",
            padding: "35px",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", ...styleTaskHeaders }}
          >
            Task Management
          </Typography>
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
              <Tab label="Organization" {...a11yProps(0)} sx={tabWidth} />
              <Tab
                label="Merchant"
                {...a11yProps(1)}
                onClick={() => setMerchantTab(true)}
                // onClick={() => history.push("/tasks/merchants")}
                sx={tabWidth}
              />
              {/* <Tab label="Coupons" {...a11yProps(2)} /> */}
            </Tabs>
            <NewTaskModal
              customIcon={<AddBoxIcon />}
              customText="Task"
              merchantTab={merchantTab}
            />

            {/* <div style={{ flexGrow: 0.3 }}></div> */}
            {/* <SearchBar /> */}
          </Box>

          <TabPanel value={value} index={0}>
            <TaskListOrg />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <TaskListMerchant />
          </TabPanel>

          {/* <TabPanel value={value} index={2}>
        Review / Publish info here
      </TabPanel> */}
        </Box>
      </CardContent>
    </Card>
  );
}
