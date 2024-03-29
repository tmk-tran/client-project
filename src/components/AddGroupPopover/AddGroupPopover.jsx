import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Style
import {
  Box,
  Button,
  TextField,
  Typography,
  Popover,
  useTheme,
  useMediaQuery,
} from "@mui/material/";
import AddBoxIcon from "@mui/icons-material/AddBox";
import "./AddGroupPopover.css";
// Utils
import {
  modalBtnStyle,
  showToast,
} from "../Utils/helpers";

export default function BasicPopover({ info }) {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth)
  console.log(info)
  // state for the popover
  const [anchorEl, setAnchorEl] = useState(null);
  // state for the add group form
  const [orgId, setOrgId] = useState(info.id);
  const [groupName, setGroupName] = useState("");
  const [department, setDepartment] = useState("");
  const [subDepartment, setSubDepartment] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSave = () => {
    const groupInfo = {
      organization_id: Number(orgId),
      department: department,
      sub_department: subDepartment,
      group_nickname: groupName,
      group_description: description,
    };

    // from Utils
    // showToast();

    dispatch({ type: "ADD_GROUP", payload: {newGroup: groupInfo, auth: auth}});

    setGroupName("");
    setDepartment("");
    setSubDepartment("");
    setDescription("");
    handleClose();
  };

  return (
    <div className="popover-container">
      <Button id="add-group-button" onClick={handleClick} fullWidth>
        <AddBoxIcon />
        &nbsp;Group
        {/* Add Group */}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {}}
        anchorOrigin={{
          vertical: isMobile ? "top" : "bottom",
          horizontal: isMobile ? "center" : "center",
        }}
        transformOrigin={{
          vertical: isMobile ? "bottom" : "bottom",
          horizontal: isMobile ? "center" : "center",
        }}
        // anchorOrigin={{
        //   vertical: isMobile ? "top" : "top",
        //   horizontal: isMobile ? "center" : "center",
        // }}
        // transformOrigin={{
        //   vertical: isMobile ? "bottom" : "top",
        //   horizontal: isMobile ? "center" : "center",
        // }}
      >
        <Box style={{ padding: "20px", width: "48vh" }}>
          <div>
            <Typography
              variant="h6"
              sx={{ p: 1, textAlign: "center", fontWeight: "bold" }}
            >
              Add New Group
            </Typography>
          </div>
          <div>
            <div className="add-group-fields">
              <TextField
                fullWidth
                label="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              ></TextField>
              <TextField
                fullWidth
                label="Category"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              ></TextField>
              <TextField
                fullWidth
                label="Sub-Category"
                value={subDepartment}
                onChange={(e) => setSubDepartment(e.target.value)}
              ></TextField>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></TextField>
            </div>
            <div style={modalBtnStyle}>
              <Button className="modal-cancel-btn" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </Box>
      </Popover>
    </div>
  );
}
