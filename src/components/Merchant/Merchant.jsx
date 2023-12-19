import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Merchant() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch({
      type: "FETCH_MERCHANT_FILES",
    });
  }, []);

  return (
    <div className={`details-container ${isSmallScreen ? "small-screen" : ""}`}>
      <Card className="details-card" elevation={3}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Merchant
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            upload PDFs here
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
