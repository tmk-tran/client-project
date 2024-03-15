import { Box } from "@mui/material";
import Typography from "../Typography/Typography";

export default function NoFile({ label, sx }) {
  return (
    <Box sx={sx}>
      <Typography label={label} variant="caption" />
    </Box>
  );
}
