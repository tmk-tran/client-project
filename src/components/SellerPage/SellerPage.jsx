import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "../Typography/Typography";
import SellerPageTable from "./SellerPageTable";
import { dispatchHook } from "../../hooks/useDispatch";
import { sellerPageInfo } from "../../hooks/reduxStore";

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

  return (
    <div style={{ minHeight: "80vh" }}>
      <Typography
        label={`Code: ${refId}`}
        variant="h6"
        sx={{ textAlign: "center" }}
      />
      <div>
      <SellerPageTable sellerInfo={sellerInfo} />
      </div>
    </div>
  );
}
