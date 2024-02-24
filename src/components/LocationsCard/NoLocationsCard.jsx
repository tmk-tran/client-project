import { Card, CardContent } from "@mui/material";
import Typography from "../Typography/Typography";
import { locationsCardWidth } from "./LocationsCard";
import { disabledColor } from "../Utils/colors";

export default function NoLocationsCard() {
  return (
    <Card elevation={2} sx={locationsCardWidth}>
      <CardContent>
        <Typography
          label="No current locations"
          sx={{
            p: 1,
            backgroundColor: disabledColor.color,
            textAlign: "center",
          }}
        />
      </CardContent>
    </Card>
  );
}
