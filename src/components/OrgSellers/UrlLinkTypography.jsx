import { Typography } from "@mui/material";

export default function UrlLinkTypography({ sx, urlForOrder }) {
  return (
    <Typography sx={sx}>
      <a href={`www.${urlForOrder}`} target="_blank" rel="noopener noreferrer">
        {`www.${urlForOrder}`}
      </a>
    </Typography>
  );
}
