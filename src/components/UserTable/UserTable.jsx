import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Card, CardContent, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddOrganizationModal from "../AddOrganizationModal/AddOrganizationModal.jsx";
import { useHistory } from "react-router-dom";
import { capitalizeWords } from "../Utils/helpers.js";
import "./UserTable.css";
import UserTableRow from "../UserTableRow/UserTableRow.jsx";

function UserTable() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "FETCH_GROUP_ADMIN" });
    dispatch({ type: "FETCH_ORGANIZATIONS" });
    dispatch({ type: "FETCH_ALL_USERS" });
  }, []);



  const user = useSelector((store) => store.user);
  const users = useSelector((store) => store.allUsers);
  const groups = useSelector((store) => store.groupAdmin);
  const organizations = useSelector((store) => store.organizations);
  const totalOrganizations = organizations.length;
  const history = useHistory();

  const [editMode, setEditMode] = useState(false);
  const [editedAdminStatus, setEditedAdminStatus] = useState("");


//   const handleGroupAdminChange = (index, value) => {
//     const updatedGroups = [...editedAdminStatus];
//     updatedGroups[index].group_admin = value;
//     setEditedAdminStatus(updatedGroups);
//   };

  return (
    <>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Groups | Leader Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            return (
             <UserTableRow key={index} user={user} />
          );
          })}
        </tbody>
      </table>
    </>
  );
}

export default UserTable;
