// ~~~~~~~~~~ Style ~~~~~~~~~~~~~~~~~~~~
import { Button, Card, CardContent, Typography } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~
import { border } from "../Utils/colors";
import { leftSpace } from "../Details/styleDetails";
import { formatPhoneNumber } from "../Utils/helpers";
import { useAlert } from "../SuccessAlert/useAlert";
// ~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~
import AddLocationModal from "./AddLocationModal";
import LocationsCardTable from "./LocationsCardTable";

export default function LocationsCard({
  locations,
  onLocationAdd,
  handleCaseTypeChange,
}) {
  console.log(locations);

  return (
    <div style={{ marginTop: "8vh" }}>
      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      {/* ~~~~~~~~~~ ADD BUTTON ~~~~~~~~~~ */}
      <AddLocationModal
        onLocationAdd={onLocationAdd}
        handleCaseTypeChange={handleCaseTypeChange}
      />
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
                {/* ~~~~~~~~~~ LOCATION DATA ~~~~~~~~~~ */}
                <LocationsCardTable data={location} />
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
