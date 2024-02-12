// ~~~~~~~~~~ Style ~~~~~~~~~~~~~~~~~~~~
import { Button, Card, CardContent, Typography } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~
import { border } from "../Utils/colors";
import { leftSpace } from "../Details/styleDetails";
import { buttonIconSpacing } from "../Utils/helpers";
import AddBox from "../AddBoxIcon/AddBoxIcon";
import AddLocationModal from "./AddLocationModal";
import { useAlert } from "../SuccessAlert/useAlert";

export default function LocationsCard({ onLocationAdd , handleCaseTypeChange }) {
  const locations = ["Location 1", "Location 2", "Location 3"];

  return (
    <div style={{ marginTop: "8vh" }}>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~ ADD BUTTON ~~~~~~~~~~ */}
      {/* <AddBox label="Location" buttonStyle={{ mb: 2, ...leftSpace }} /> */}
      <AddLocationModal onLocationAdd={onLocationAdd} handleCaseTypeChange={handleCaseTypeChange} />
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {locations.map((location, index) => (
        <Card
          key={index}
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
              <Typography>{location}</Typography>
              <Typography>Contact Number</Typography>
              <Typography>Additional Details</Typography>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
