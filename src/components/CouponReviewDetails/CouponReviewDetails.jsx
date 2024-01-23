import React, { useState } from "react";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { border } from "../Utils/colors";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import CouponReviewButtons from "./CouponReviewButtons";
import DenyProofModal from "../DenyProofModal/DenyProofModal";

export default function CouponReviewDetails() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isModalOpen);

  const handleDenyButtonClick = () => {
    // Open the modal when Deny button is clicked
    setIsModalOpen(true);
  };

  return (
    <div className={`details-container ${isSmallScreen ? "small-screen" : ""}`}>
      <Card className="details-card" elevation={3}>
        <CardContent>
          <div className="detailsView-container">
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}
            >
              Coupon Details
            </Typography>

            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <Card style={{ width: "50vw", height: "64vh" }} elevation={3}>
              <CardContent>
                <div style={{ width: "25vw" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 15,
                    }}
                  >
                    <div style={border}>
                      <div
                        style={{
                          height: "15vh",
                          backgroundColor: "#D9D9D9",
                        }}
                      >
                        <Typography
                          sx={{ textAlign: "center", lineHeight: "15vh" }}
                        >
                          Front of Coupon
                        </Typography>
                      </div>
                    </div>

                    <div style={border}>
                      <div
                        style={{
                          height: "15vh",
                          backgroundColor: "#D9D9D9",
                        }}
                      >
                        <Typography
                          sx={{ textAlign: "center", lineHeight: "15vh" }}
                        >
                          Back of Coupon
                        </Typography>
                      </div>
                    </div>

                    <div style={border}>
                      <div
                        style={{
                          height: "10vh",
                          backgroundColor: "rgba(96, 96, 96, 0.1)",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ textAlign: "center", lineHeight: "10vh" }}
                        >
                          Details of Coupon
                        </Typography>
                      </div>
                    </div>

                    <CouponReviewButtons
                      onDenyButtonClick={handleDenyButtonClick}
                    />

                    {isModalOpen && (
                      <DenyProofModal onClose={() => setIsModalOpen(false)} />
                    )}

                  </div>
                </div>
              </CardContent>
            </Card>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
