import { Box } from "@mui/material";
import Typography from "../Typography/Typography";

export default function SellerFormHeader() {
  return (
    <>
      <Typography
        label="Edit Seller"
        variant="h6"
        sx={{ textAlign: "center" }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography label="*required" variant="caption" />
      </Box>
    </>
  );
}
