import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, Card, CardContent, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { border } from "../Utils/colors";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import DenyProofModal from "../DenyProofModal/DenyProofModal";
import CouponStatusDropdown from "../CouponStatusDropdown/CouponStatusDropdown";
import CouponReviewButtons from "./CouponReviewButtons";
import CouponReviewComments from "./CouponReviewComments";
import BackButton from "../BackButton/BackButton";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";

export default function CouponReviewDetails() {
  const dispatch = dispatchHook();
  const mId = useParams();
  const merchantId = mId.id;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDenyButtonClick = () => {
    // Open the modal when Deny button is clicked
    setIsModalOpen(true);
  };

  useEffect(() => {
    // Ensure that merchantId is available before dispatching the action
    if (merchantId) {
      dispatch({ type: "FETCH_MERCHANT_COMMENTS", payload: merchantId });
    }
  }, [dispatch, merchantId]);

  return (
    <div className={`details-container ${isSmallScreen ? "small-screen" : ""}`}>
      <Card className="details-card" elevation={3}>
        <CardContent>
          <div className="detailsView-container">
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                marginBottom: "40px",
              }}
            >
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              {/* ~~~~~~~~~~ BACK BUTTON ~~~~~~~~~~ */}
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <BackButton />
              {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  flexGrow: 1,
                }}
              >
                Coupon Details
              </Typography>
            </div>

            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <Card
              style={{ width: "50vw", height: "64vh", margin: "0 auto" }}
              elevation={3}
            >
              <CardContent>
                <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
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
                            height: "18vh",
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
                            height: "18vh",
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
                            height: "15vh",
                            backgroundColor: "rgba(96, 96, 96, 0.1)",
                          }}
                        >
                          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                          {/* ~~~~~~~~~~~~ STATUS ~~~~~~~~~~~~~ */}
                          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                          <CouponStatusDropdown />
                          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                          <Typography
                            variant="body2"
                            sx={{ textAlign: "center", mt: 2 }}
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
                  {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                  {/* ~~~~~~~~~~~~ COMMENTS ~~~~~~~~~~~ */}
                  {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                  <CouponReviewComments />
                  {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
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
