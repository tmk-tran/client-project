import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
// ~~~~~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
import { dispatchHook } from "../../hooks/useDispatch";
import { sellerPageInfo } from "../../hooks/reduxStore";
import { centerDiv } from "../Utils/helpers";
import { useAlert } from "../SuccessAlert/useAlert";
import { useCaseType } from "../Utils/useCaseType";
import { border } from "../Utils/colors";
// ~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~~ //
import Typography from "../Typography/Typography";
import SellerPageTable from "./SellerPageTable";
import CashUpdateModal from "./CashUpdateModal";
import UrlDisplay from "./UrlDisplay";
import SuccessAlert from "../SuccessAlert/SuccessAlert";

const divStyle = {
  ...centerDiv,
  flexDirection: "column",
};

export default function SellerPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = dispatchHook();
  const { refId } = useParams();

  useEffect(() => {
    const fetchAction = { type: "FETCH_SELLER_PAGEINFO", payload: refId };
    console.log("Dispatching action:", fetchAction);
    dispatch(fetchAction);
  }, [refId]);
  console.log(refId);
  const sellerInfo = sellerPageInfo() || [];
  console.log(sellerInfo);

  const { isAlertOpen, handleAlertClose, handleTaskUpdate } = useAlert();
  const { caseType, handleCaseTypeChange } = useCaseType("default");

  const updateSellerInfo = (updateType, amountToUpdate) => {
    console.log(updateType);
    console.log(amountToUpdate);
    const sellerId = sellerInfo[0].id;
    console.log(sellerId);
    const updateAction = {
      type: `UPDATE_${updateType.toUpperCase()}`,
      payload: {
        id: sellerId,
        refId: refId,
        [updateType.toLowerCase()]: Number(amountToUpdate),
        updateType: updateType.toLowerCase(),
      },
    };
    console.log("Dispatching action:", updateAction);
    dispatch(updateAction);
  };

  return (
    <div>
      <Typography
        label={`Code: ${refId}`}
        variant="h6"
        sx={{ mt: 5, textAlign: "center" }}
      />
      <SuccessAlert
        isOpen={isAlertOpen}
        onClose={handleAlertClose}
        caseType={caseType}
      />
      <div style={divStyle}>
        <SellerPageTable sellerInfo={sellerInfo} />
        <div
          style={{
            display: "flex",
            gap: 100,
            flexDirection: isSmallScreen ? "column" : "row",
            marginTop: 25,
          }}
        >
          <div
            style={{
              ...divStyle,
              padding: 25,
            }}
          >
            <UrlDisplay sellerRefId={refId} />
          </div>
          <div>
            <CashUpdateModal
              updateSellerInfo={updateSellerInfo}
              caseType="Cash"
              handleCaseTypeChange={handleCaseTypeChange}
              onUpdate={handleTaskUpdate}
            />
            <CashUpdateModal
              updateSellerInfo={updateSellerInfo}
              caseType="Checks"
              handleCaseTypeChange={handleCaseTypeChange}
              onUpdate={handleTaskUpdate}
            />
            <CashUpdateModal
              updateSellerInfo={updateSellerInfo}
              caseType="Donations"
              handleCaseTypeChange={handleCaseTypeChange}
              onUpdate={handleTaskUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
