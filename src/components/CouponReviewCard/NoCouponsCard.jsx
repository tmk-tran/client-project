import { Card, CardContent } from "@mui/material";
import Typography from "../Typography/Typography";

export default function NoCouponsCard() {
  return (
    <Card>
      <CardContent>
        <Typography label="Coupons empty" />
      </CardContent>
    </Card>
  );
}
