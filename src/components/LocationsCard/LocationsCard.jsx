import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~~~~~~~~~~~
import { Card, CardContent, Divider, Typography } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { capitalizeWords } from "../Utils/helpers";
import { lineDivider } from "../Utils/modalStyles";
// ~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~
import AddLocationModal from "./AddLocationModal";
import LocationsCardTable from "./LocationsCardTable";
import ActionsSpeedDial from "./ActionsSpeedDial";
import NoDetailsCard from "../NoDetailsCard/NoDetailsCard";

export const locationsCardWidth = {
  width: "56vw",
};

export default function LocationsCard({
  locations,
  handleTaskUpdate,
  handleCaseTypeChange,
  handleAddLocation,
}) {
  const dispatch = dispatchHook();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [locationToEdit, setLocationToEdit] = useState(null);

  const handleEditToggle = (locationFromSpeedDial) => {
    setIsEditing(!isEditing);
    if (locationFromSpeedDial !== null) {
      setLocationToEdit(locationFromSpeedDial); // Set the location being edited
    }
  };

  const handleDelete = (locationId, merchantId) => {
    dispatch({
      type: "DELETE_LOCATION",
      payload: {
        locationId,
        merchantId,
      },
    });
  };

  const handleOpenModal = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleEdit = (locationId, merchantId) => {
    setEditId(locationId);
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
        locationToEdit={locationToEdit}
      />
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {locations.length === 0 ? (
        <NoDetailsCard label="No current locations" />
      ) : (
        locations
          .filter((location) => !location.is_deleted)
          .map((location, i) => (
            <Card key={i} elevation={3} sx={{ ...locationsCardWidth, mb: 1 }}>
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
                  <Typography sx={{ fontWeight: "bold", pt: 1.5 }}>
                    {capitalizeWords(location.location_name)}
                  </Typography>
                  {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                  {/* ~~~~~~~~ ACTIONS SPEED DIAL ~~~~~~~ */}
                  <ActionsSpeedDial
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleOpenModal={handleOpenModal}
                    location={location}
                    toggleEdit={handleEditToggle}
                  />
                </div>
                <Divider sx={{ ...lineDivider, mb: 1 }} />
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* ~~~~~~~~~~ LOCATION DATA ~~~~~~~~~~ */}
                <LocationsCardTable data={location} />
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* <ActionsSpeedDial handleDelete={handleDelete} location={location} /> */}
              </CardContent>
            </Card>
          ))
      )}
    </div>
  );
}
