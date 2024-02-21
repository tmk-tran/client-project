import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dispatchHook } from "../../hooks/useDispatch";
import { sellerPageInfo } from "../../hooks/reduxStore";
// ~~~~~~~~~~~~ Components ~~~~~~~~~~~~~~~~~~~~~ //
import Typography from "../Typography/Typography";
import SellerPageTable from "./SellerPageTable";
import CashUpdateModal from "./CashUpdateModal";

export default function SellerPage() {
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

  const updateCash = (cashAmount) => {
    console.log(cashAmount);
    const amountToUpdate = Number(cashAmount) || 0;
    console.log(amountToUpdate);
    const sellerId = sellerInfo[0].id;
    console.log(sellerId);
    console.log(refId);

    const updateAction = {
      type: "UPDATE_CASH",
      payload: {
        id: sellerId,
        refId: refId,
        cash: amountToUpdate,
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <SellerPageTable sellerInfo={sellerInfo} />
        <CashUpdateModal updateCash={updateCash} />
      </div>
    </div>
  );
}
