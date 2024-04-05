import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import {
  Box,
  Button,
  TableContainer,
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
import { containerStyle, flexRowSpace } from "../Utils/pageStyles";
import { showSaveSweetAlert } from "../Utils/sweetAlerts";
// ~~~~~~~~~ Components ~~~~~~~~~ //
import ActionSwitch from "./ActionSwitch";
import OrgMenu from "./OrgMenu";
import UserAdminHeader from "./UserAdminHeader";

const pageHeaderStyle = {
  textAlign: "center",
  mb: 2,
};

const headerStyle = {
  border: "1px solid #f0f0f0",
  backgroundColor: "#d9d9d9",
  lineHeight: 1,
};

const shortHeaderCell = {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  const fuse = new Fuse(tableData, {
    keys: ["last_name"], // The 'merchant' field is used for searching
    includeScore: true,
    threshold: 0.3, // Adjust the threshold for fuzzy search accuracy
  });

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

  const handleOrgSelect = (userId, id) => {
    const dispatchAction = {
      type: "SET_ORGANIZATION_ADMIN",
      payload: {
        id: userId,
        org_id: id,
      },
    };
    console.log(dispatchAction);
    dispatch(dispatchAction);
    showSaveSweetAlert({ label: "Organization Admin Set" });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (value) => {
    console.log(value);
    setQuery(value);
    if (value.trim() === "") {
      setFilteredUsers([]);
    } else {
      const results = fuse.search(value);
      setFilteredUsers(results.map((result) => result.item));
    }
  };

  const filteredResults = tableData.filter(
    (user) =>
      user.last_name &&
      user.last_name.toLowerCase().includes(query.toLowerCase())
  );
  console.log(filteredResults);

  const clearInput = () => {
    setQuery("");
    setCurrentPage(1); // Reset to the first page when clearing the search
  };

  return (
    <div style={{ ...containerStyle }}>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~ Header ~~~~~~~~~~ */}
      <UserAdminHeader
        query={query}
        onChange={handleSearch}
        clearInput={clearInput}
        pageHeaderStyle={pageHeaderStyle}
        isModalOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~ Table ~~~~~~~~~~ */}
      <TableContainer sx={{ maxHeight: "100vh", overflow: "auto" }}>
        <Table stickyHeader>
          {/* ~~~~~~~~~~ HEAD ~~~~~~~~~~ */}
          <TableHead>
            <TableRow>
              <TableCell sx={headerStyle}>Last Name</TableCell>
              <TableCell sx={headerStyle}>First Name</TableCell>
              <TableCell sx={headerStyle}>Username</TableCell>
              <TableCell sx={{ ...headerStyle, ...shortHeaderCell, ...center }}>
                Graphic Designer
              </TableCell>
              <TableCell sx={{ ...headerStyle, ...shortHeaderCell, ...center }}>
                Organization Admin
              </TableCell>
              <TableCell sx={{ ...headerStyle, ...center }}>
                Organization Name
              </TableCell>
            </TableRow>
          </TableHead>
          {/* ~~~~~~~~~~ BODY ~~~~~~~~~~ */}
          <TableBody>
            {filteredResults.map((row, index) => (
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
                      userId={row.id}
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
      </TableContainer>
    </div>
  );
}
