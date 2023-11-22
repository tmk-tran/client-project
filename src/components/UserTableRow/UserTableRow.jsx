import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  OutlinedInput,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import "./UserTableRow.css";

function UserTableRow({ user }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_GROUP_ADMIN" });
    dispatch({ type: "FETCH_ORGANIZATIONS" });
    dispatch({ type: "FETCH_ALL_USERS" });
  }, []);

  const users = useSelector((store) => store.allUsers);
  const groups = useSelector((store) => store.groupAdmin);
  const organizations = useSelector((store) => store.organizations);
  const totalOrganizations = organizations.length;
  const history = useHistory();

  const [editMode, setEditMode] = useState(false);

  //   const [adminStatus, setAdminStatus] = useState(user.groups.group_admin);

  //   const saveEditStatus = () => {
  //     // Ensure newData is defined before dispatching
  //     const newData = {
  //       user_id: user.user_id,
  //       "groups.group_id": user.groups.group_id,
  //       "groups.group_admin": adminStatus,
  //     };
  //     dispatch({ type: "EDIT_ADMIN_STATUS", payload: newData });
  //     console.log(newData);
  //   };

  // const handleGroupAdminChange = (index, value) => {
  //   const updatedGroups = [...editedAdminStatus];
  //   updatedGroups[index].group_admin = value;
  //   setEditedAdminStatus(updatedGroups);
  // };

  const [adminStatus, setAdminStatus] = useState(
    user.groups.reduce((acc, group) => {
      acc[group.group_id] = group.group_admin;
      return acc;
    }, {})
  );

  const saveEditStatus = () => {
    const newData = {
      groups: user.groups.map((group) => ({
        id: group.id,
        group_admin: adminStatus[group.group_id],
      })),
    };
    dispatch({ type: "EDIT_ADMIN_STATUS", payload: newData });
    console.log(newData);
  };

  return (
    <>
      <TableRow className="active_row" style={{ border: "2px solid black" }}>
        {/* <TableCell className="active_table_cell">
          <Typography
            style={{ fontSize: "17px", width: "88px", marginLeft: "auto", marginRight: 'auto' }}
          >
            {user.user_id}
          </Typography>
        </TableCell> */}
        <TableCell className="active_table_cell">
          <Typography
            style={{ fontSize: "19px", width: "88px", marginLeft: "auto", marginRight: 'auto' }}
          >
            {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
          </Typography>
        </TableCell>
        <TableCell className="active_table_cell">
          <Typography
            style={{ fontSize: "19px", width: "520px", marginLeft: "auto", marginRight: 'auto' }}
          >
            {user.groups[0].group_id !== null ? (
              <ul>
                {user.groups.map((group, index) => (
                  <li key={group.id}>
                    {group.group_nickname ? (
                      <>
                        {group.group_nickname} in {group.organization_name} |{" "}
                        {editMode ? (
                          <select
                            value={adminStatus[group.group_id]}
                            onChange={(e) => {
                              setAdminStatus((prevAdminStatus) => ({
                                ...prevAdminStatus,
                                [group.group_id]: e.target.value === "true",
                              }));
                            }}
                          >
                            <option value="true">Leader</option>
                            <option value="false">Not Leader</option>
                          </select>
                        ) : adminStatus[group.group_id] ? (
                          "Group Leader"
                        ) : (
                          "Not Group Leader"
                        )}
                      </>
                    ) : (
                      <>
                        {group.group_department} in {group.organization_name} |{" "}
                        {editMode ? (
                          <select
                            value={adminStatus[group.group_id]}
                            onChange={(e) => {
                              setAdminStatus((prevAdminStatus) => ({
                                ...prevAdminStatus,
                                [group.group_id]: e.target.value === "true",
                              }));
                            }}
                          >
                       <option value="true">Leader</option>
                            <option value="false">Not Leader</option>
                          </select>
                        ) : adminStatus[group.group_id] ? (
                          "Group Leader"
                        ) : (
                          "Not Group Leader"
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Not in any groups</p>
            )}
          </Typography>
        </TableCell>
        <TableCell className="active_table_cell">
          <Typography
            style={{ fontSize: "19px", width: "180px", marginLeft: "auto", marginRight: 'auto' }}
          >
            {user.groups[0].group_id !== null ? (
              editMode ? (
                <>
                  <Button
                    style={{
                      fontSize: "15px",
                      padding: "2px 8px",
                      fontWeight: "bold",
                      border: "1px solid black",
                      transition: "background-color 0.3s",
                    }}
                    variant="outlined"
                    onClick={() => {
                      setEditMode(false);
                    }}
                  >
                    Cancel
                  </Button>{" "}
                  <Button
                    style={{
                      fontSize: "15px",
                      padding: "2px 8px",
                      fontWeight: "bold",
                      border: "1px solid black",
                      transition: "background-color 0.3s",
                    }}
                    variant="outlined"
                    onClick={() => {
                      Swal.fire({
                        icon: "success",
                        title: "Admin Status Changed",
                        text: `The admin status was successfully changed.`,
                      });
                      saveEditStatus();
                      setEditMode(false);
                    }}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  style={{
                    fontSize: "15px",
                    padding: "2px 8px",
                    fontWeight: "bold",
                    border: "1px solid black",
                    transition: "background-color 0.3s",
                  }}
                  variant="outlined"
                  onClick={() => setEditMode(true)}
                >
                  Edit Leader Status
                </Button>
              )
            ) : (
              "No actions Available"
            )}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
}

export default UserTableRow;
