import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import CloseIcon from "@mui/icons-material/Close";
import "./AddGroupPopover.css";
// Utils
import { modalBtnStyle, showToast } from "../Utils/helpers";

export default function BasicPopover({ info }) {
  const dispatch = useDispatch();
  // state for the popover
  const [anchorEl, setAnchorEl] = useState(null);
  // state for the add group form
  const [orgId, setOrgId] = useState(info.organization_id);
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
      organization_id: orgId,
      department: department,
      sub_department: subDepartment,
      group_nickname: groupName,
      group_description: description,
    };

    // from Utils
    showToast();

    dispatch({ type: "ADD_GROUP", payload: groupInfo });

    setGroupName("");
    setDepartment("");
    setSubDepartment("");
    setDescription("");
    handleClose();
  };

  return (
    <div className="popover-container">
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Add Group
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        // onClose={handleClose}
        onClose={() => {}}
        anchorOrigin={{
          vertical: isMobile ? "top" : "bottom",
          horizontal: isMobile ? "center" : "right",
        }}
        transformOrigin={{
          vertical: isMobile ? "bottom" : "bottom",
          horizontal: isMobile ? "center" : "left",
        }}
      >
        <Box style={{ padding: "20px" }}>
          <div>
            <Typography sx={{ p: 1, textAlign: "center", fontWeight: "bold" }}>
              New Group
            </Typography>
          </div>
          <div>
            <div className="add-group-fields">
              <TextField
                fullWidth
                label="Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              ></TextField>
              <TextField
                fullWidth
                label="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              ></TextField>
              <TextField
                fullWidth
                label="Division"
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
