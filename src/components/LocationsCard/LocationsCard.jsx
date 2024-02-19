import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~~~~~~~~~~~
import { Button, Card, CardContent, Typography } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~
import { leftSpace } from "../Details/styleDetails";
import { dispatchHook } from "../../hooks/useDispatch";
// ~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~
import AddLocationModal from "./AddLocationModal";
import LocationsCardTable from "./LocationsCardTable";
import ActionsSpeedDial from "./ActionsSpeedDial";
import { capitalizeWords } from "../Utils/helpers";
import EditLocationModal from "./EditLocationModal";

export default function LocationsCard({
  locations,
  handleTaskUpdate,
  handleCaseTypeChange,
  handleAddLocation,
}) {
  console.log(locations);
  const dispatch = dispatchHook();
  const [isEditing, setIsEditing] = useState(false);
  console.log(isEditing);

  const [editingLocation, setEditingLocation] = useState(null); // State to store the location being edited
  console.log(editingLocation);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isModalOpen);
  const [editId, setEditId] = useState(null);
  console.log(editId);

  const handleEditToggle = (index) => {
    console.log(index);
    setIsEditing(!isEditing);
    if (index !== undefined) {
      setEditingLocation(locations[index]); // Set the location being edited
    }
  };

  const handleDelete = (locationId, merchantId) => {
    console.log(locationId);
    console.log(merchantId);

    dispatch({
      type: "DELETE_LOCATION",
      payload: {
        locationId,
        merchantId,
      },
    });
    handleTaskUpdate();
    handleCaseTypeChange("Delete Location");
  };

  const handleOpenModal = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  // START HERE ON RETURN ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CREATE EDIT ROUTER, AND SAGA
  const handleEdit = (locationId, merchantId) => {
    console.log(locationId);
    console.log(merchantId);
    setEditId(locationId);

    // dispatch({
    //   type: "EDIT_LOCATION",
    //   payload: {
    //     locationId,
    //     merchantId,
    //   },
    // });
    // onLocationEdit();
    // handleTaskUpdate();
    // handleCaseTypeChange("Edit Location");
  };
  const handleEditPayload = (payload) => {
    console.log(payload);
  };

  return (
    <div style={{ marginTop: "8vh" }}>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~ ADD BUTTON ~~~~~~~~~~ */}
      <AddLocationModal
        onLocationAdd={handleTaskUpdate}
        handleCaseTypeChange={handleCaseTypeChange}
        handleAddLocation={handleAddLocation}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleCloseModal={handleCloseModal}
        editId={editId}
        onSubmit={handleEditPayload}
      />
      {/* <EditLocationModal isOpen={isEditing} onClose={handleCloseModal} /> */}

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {locations
        .filter((location) => !location.is_deleted)
        .map((location, i) => (
          <Card
            key={i}
            elevation={3}
            sx={{ width: "54vw", ...leftSpace, mb: 1 }}
          >
            <CardContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* ~~~~~~~~~~ LOCATION NAME ~~~~~~~~~~ */}
                <Typography variant="h6">
                  {capitalizeWords(location.location_name)}
                </Typography>
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* ~~~~~~~~ ACTIONS SPEED DIAL ~~~~~~~ */}
                <ActionsSpeedDial
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleOpenModal={handleOpenModal}
                  location={location}
                  i={i}
                  toggleEdit={handleEditToggle}
                />
              </div>
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~ LOCATION DATA ~~~~~~~~~~ */}
              <LocationsCardTable data={location} isEditing={isEditing} />
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* <ActionsSpeedDial handleDelete={handleDelete} location={location} /> */}
            </CardContent>
          </Card>
        ))}

      {/* Render the AddLocationModal component if isEditing is true */}
      {/* {isEditing && (
        <AddLocationModal
        />
      )} */}
    </div>
  );
}
