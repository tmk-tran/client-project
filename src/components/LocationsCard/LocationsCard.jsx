// ~~~~~~~~~~ Style ~~~~~~~~~~~~~~~~~~~~
import { Button, Card, CardContent } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~
import { leftSpace } from "../Details/styleDetails";
import { dispatchHook } from "../../hooks/useDispatch";
// ~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~
import AddLocationModal from "./AddLocationModal";
import LocationsCardTable from "./LocationsCardTable";

export default function LocationsCard({
  locations,
  onLocationAdd,
  onLocationDelete,
  handleCaseTypeChange,
}) {
  console.log(locations);
  const dispatch = dispatchHook();

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
    onLocationDelete();
    handleCaseTypeChange("Delete Location");
  };

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
              <Button
                onClick={() => {
                  handleDelete(location.id, location.merchant_id);
                }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
