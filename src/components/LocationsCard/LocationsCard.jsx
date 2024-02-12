// ~~~~~~~~~~ Style ~~~~~~~~~~~~~~~~~~~~
import { Button, Card, CardContent, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~
import { border } from "../Utils/colors";
import { leftSpace } from "../Details/styleDetails";
import { buttonIconSpacing } from "../Utils/helpers";

export default function LocationsCard() {
  const locations = ["Location 1", "Location 2", "Location 3"];

  return (
    <div style={{ marginTop: "8vh", ...border }}>
      <Button sx={leftSpace}>
        <AddBoxIcon sx={buttonIconSpacing} />
        Add Location
      </Button>
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
