import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dispatchHook } from "../../hooks/useDispatch";
import { sellerPageInfo } from "../../hooks/reduxStore";
import { useTheme, useMediaQuery } from "@mui/material";
// ~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~~ //
import Typography from "../Typography/Typography";
import SellerPageTable from "./SellerPageTable";
import CashUpdateModal from "./CashUpdateModal";
import UrlDisplay from "./UrlDisplay";
import { centerDiv } from "../Utils/helpers";
import { border } from "../Utils/colors";

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

  //   const updateCash = (cashAmount) => {
  //     console.log(cashAmount);
  //     const amountToUpdate = Number(cashAmount) || 0;
  //     console.log(amountToUpdate);
  //     const sellerId = sellerInfo[0].id;
  //     console.log(sellerId);
  //     console.log(refId);

  //     const updateAction = {
  //       type: "UPDATE_CASH",
  //       payload: {
  //         id: sellerId,
  //         refId: refId,
  //         cash: amountToUpdate,
  //       },
  //     };
  //     console.log("Dispatching action:", updateAction);
  //     dispatch(updateAction);
  //   };

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
    <div style={{ minHeight: "80vh" }}>
      <Typography
        label={`Code: ${refId}`}
        variant="h6"
        sx={{ textAlign: "center" }}
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
            />
            <CashUpdateModal
              updateSellerInfo={updateSellerInfo}
              caseType="Checks"
            />
            <CashUpdateModal
              updateSellerInfo={updateSellerInfo}
              caseType="Donations"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
