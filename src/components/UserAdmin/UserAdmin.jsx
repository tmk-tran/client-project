import React, { useEffect } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
// ~~~~~~~~~ Hooks ~~~~~~~~~ //
import { dispatchHook } from "../../hooks/useDispatch";
import { userTableData, allOrganizations } from "../../hooks/reduxStore";
import { containerStyle } from "../Utils/pageStyles";
import { showSaveSweetAlert } from "../Utils/sweetAlerts";
// ~~~~~~~~~ Components ~~~~~~~~~ //
import ActionSwitch from "./ActionSwitch";
import OrgMenu from "./OrgMenu";

const headerCellSx = {
  width: 120,
};

const wideCellSx = {
  border: "1px solid #ddd",
};

const shortCellSx = {
  width: 120,
  border: "1px solid #ddd",
};

const center = {
  textAlign: "center",
};

export default function UserAdmin() {
  const dispatch = dispatchHook();

  useEffect(() => {
    const action = {
      type: "FETCH_USER_TABLE",
    };
    dispatch(action);
    const action2 = {
      type: "FETCH_ORGANIZATIONS",
    };
    dispatch(action2);
  }, []);

  const tableData = userTableData() || [];
  console.log(tableData);
  const allOrgs = allOrganizations() || [];
  console.log(allOrgs);

  const handleSwitch = (id, type, newValue) => {
    console.log(id, type, newValue);
    const action = {
      type: "CHANGE_USER_ROLE",
      payload: {
        id: id,
        [type === "graphic_designer" ? "graphic_designer" : "org_admin"]:
          newValue,
      },
    };
    console.log(action);
    dispatch(action);
    showSaveSweetAlert({ label: "User Role Updated" });
  };

  const handleOrgSelect = (id, newValue) => {
    console.log(id, newValue);
  };

  return (
    <div style={{ ...containerStyle }}>
      <Box sx={{ maxHeight: "100vh", overflow: "auto" }}>
      <Table>
        {/* ~~~~~~~~~~ HEAD ~~~~~~~~~~ */}
        <TableHead>
          <TableRow>
            <TableCell>Last Name</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell sx={{ ...headerCellSx, ...center }}>
              Graphic Designer
            </TableCell>
            <TableCell sx={{ ...headerCellSx, ...center }}>
              Organization Admin
            </TableCell>
            <TableCell sx={center}>Organization Name</TableCell>
          </TableRow>
        </TableHead>
        {/* ~~~~~~~~~~ BODY ~~~~~~~~~~ */}
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{
                bgcolor:
                  index % 2 === 0 ? "rgba(0, 0, 0, 0.04)" : "transparent",
              }}
            >
              <TableCell sx={wideCellSx}>{row.last_name}</TableCell>
              <TableCell sx={wideCellSx}>{row.first_name}</TableCell>
              <TableCell sx={wideCellSx}>
                <strong>{row.username}</strong>
              </TableCell>
              <TableCell sx={{ ...shortCellSx, ...center }}>
                {/* ~~~~~~~~~ Graphic Designer Column ~~~~~~~~~~ */}
                {row.graphic_designer ? (
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ display: "inline" }}
                  >
                    Yes
                  </Typography>
                ) : (
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ display: "inline" }}
                  >
                    No
                  </Typography>
                )}
                <ActionSwitch
                  isChecked={row.graphic_designer}
                  onChange={(newValue) =>
                    handleSwitch(row.id, "graphic_designer", newValue)
                  }
                />
              </TableCell>
              <TableCell sx={{ ...shortCellSx, ...center }}>
                {/* ~~~~~~~~~ Org Admin Column ~~~~~~~~~~ */}
                {row.org_admin ? (
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ display: "inline" }}
                  >
                    Yes
                  </Typography>
                ) : (
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ display: "inline" }}
                  >
                    No
                  </Typography>
                )}
                <ActionSwitch
                  isChecked={row.org_admin}
                  onChange={(newValue) =>
                    handleSwitch(row.id, "org_admin", newValue)
                  }
                />
              </TableCell>
              <TableCell sx={{ ...wideCellSx, ...center, maxWidth: 150 }}>
                {row.org_admin ? (
                  <OrgMenu
                    organizations={allOrgs}
                    defaultValue={row.org_id}
                    onChange={handleOrgSelect}
                  />
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Box>
    </div>
  );
}
