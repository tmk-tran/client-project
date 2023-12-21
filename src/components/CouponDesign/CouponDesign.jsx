import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Merchant() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // Store
//   const merchantFiles = useSelector((store) => Array.from(store.merchant)); // Convert generators to arrays
  const couponFiles = useSelector((store) => store.coupon);
  console.log(couponFiles);

  useEffect(() => {
    dispatch({
      type: "FETCH_COUPON_FILES",
    });
  }, [dispatch]);

  const downloadPdf = (pdf_Data, fileName) => {
    console.log(pdf_Data);
    console.log(fileName);
    const blob = new Blob([pdf_Data], { type: "application/pdf" });
    console.log(blob);
    const url = URL.createObjectURL(blob);

    // Create a link element and simulate a click to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Cleanup: remove the link and revoke the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`details-container ${isSmallScreen ? "small-screen" : ""}`}>
      <Card className="details-card" elevation={3}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Coupon
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            upload PDFs here
          </div>
          {couponFiles.map((file, i) => (
            <div key={i}>
              <a href="#" onClick={() => downloadPdf(file.pdf_data, file.filename)}>
                {file.filename}
              </a>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
