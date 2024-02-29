import { Card, CardContent } from "@mui/material";

const cardStyle = {
  width: "50%",
};

export default function OrgDetailsSection() {
  return (
    <Card elevation={3} sx={cardStyle}>
      <CardContent>Organization info</CardContent>
    </Card>
  );
}
