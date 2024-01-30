import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Tab, Tabs, Box, Typography, Card, CardContent } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import SearchBar from "../SearchBar/SearchBar";
import TaskListOrg from "../TaskList/TaskListOrg";
import TaskListMerchant from "../TaskList/TaskListMerchant";
import NewTaskModal from "../NewTaskModal/NewTaskModal";
import TaskList from "../TaskList/TaskList";
import { border } from "../Utils/colors";
import { historyHook } from "../../hooks/useHistory";
import { dispatchHook } from "../../hooks/useDispatch"
import { mComments } from "../../hooks/reduxStore";

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
  console.log(merchantTab);
  const [activeTab, setActiveTab] = useState("organization"); // Set the default tab
  console.log(activeTab);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  useEffect(() => {
    // Dispatch actions based on the active tab
    if (activeTab === "organization") {
      dispatch({ type: "FETCH_ALL_ORGANIZATION_TASKS" });
    } else if (activeTab === "merchant") {
      dispatch({ type: "FETCH_ALL_MERCHANT_TASKS" });
    }
    // Add more conditions if needed...
  }, [dispatch, activeTab]);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const merchantComments = mComments() || [];
  console.log(merchantComments);

  const styleTaskHeaders = {
    fontWeight: "bold",
    mb: 5,
  };

  const tabWidth = {
    width: "25vw",
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  const handleMerchantTab = () => {
    setActiveTab("merchant");
    setMerchantTab(true);
  }

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
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~ Page Header ~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          <Typography
            variant="h5"
            sx={{ textAlign: "center", ...styleTaskHeaders }}
          >
            Task Management
          </Typography>
          {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~ */}
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
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~~~ Tab Headers ~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <Tabs
              value={value}
              // value={currentTab}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Organization"
                {...a11yProps(0)}
                sx={tabWidth}
                // onClick={() => setMerchantTab(false)}
                onClick={() => setActiveTab("organization")}
              />
              <Tab
                label="Merchant"
                {...a11yProps(1)}
                // onClick={() => setMerchantTab(true)}
                onClick={handleMerchantTab}
                sx={tabWidth}
              />
              {/* <Tab label="Coupons" {...a11yProps(2)} /> */}
            </Tabs>
            <NewTaskModal
              customIcon={<AddBoxIcon />}
              customText="Task"
              merchantTab={merchantTab}
            />
            {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~ */}

            {/* <div style={{ flexGrow: 0.3 }}></div> */}
            {/* <SearchBar /> */}
          </Box>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~ Tab Body ~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          <TabPanel value={value} index={0}>
            <TaskListOrg />
            {/* <TaskList taskType={type} /> */}
          </TabPanel>

          <TabPanel value={value} index={1}>
            <TaskListMerchant />
            {/* <TaskList taskType={type} /> */}
          </TabPanel>
          {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~ */}

          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~ Coupon Tab (unused) ~~~~~~~~~~~~~~ */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* <TabPanel value={value} index={2}>
        Review / Publish info here
      </TabPanel> */}
          {/* ~~~~~~~~~~~~~~~~ END ~~~~~~~~~~~~~~~~~~~~ */}
        </Box>
      </CardContent>
    </Card>
  );
}
