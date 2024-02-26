import { Typography } from "@mui/material";

export default function UrlLinkTypography({ sx, urlForOrder }) {
  return (
    <Typography sx={sx}>
      <a href={urlForOrder} target="_blank" rel="noopener noreferrer">
        {urlForOrder}
      </a>
    </Typography>
  );
}
