import { Card, CardContent } from "@mui/material";
import Typography from "../Typography/Typography";
import { locationsCardWidth } from "./LocationsCard";

export default function NoLocationsCard() {
  return (
    <Card elevation={2} sx={locationsCardWidth}>
      <CardContent>
        <Typography label="No current locations" sx={{ p: 1, backgroundColor: "#f5f5f5", textAlign: "center" }} />
      </CardContent>
    </Card>
  );
}
