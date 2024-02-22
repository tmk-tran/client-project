import React, { useState, useEffect } from "react";
import { Box, Modal, Divider } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~
import { orderUrl, transactionsUrl } from "../SellerPage/sellerUtils";
import { lineDivider } from "../Utils/modalStyles";
// ~~~~~~~~~~ Components ~~~~~~~~~~~~~~
import CopySnackBar from "./CopySnackbar";
import Typography from "../Typography/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ViewUrl({ open, close, sellerRefId }) {
  console.log(sellerRefId);
  const [sellerUrl, setSellerUrl] = useState("");
  console.log(sellerUrl);
  const [urlForOrder, setUrlForOrder] = useState("");
  console.log(urlForOrder);

  useEffect(() => {
    if (sellerRefId) {
      setSellerUrl(transactionsUrl(sellerRefId));
      setUrlForOrder(orderUrl(sellerRefId));
    }
  }, [sellerRefId]);

  const onClose = () => {
    close();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sellerUrl);
  };

  const copyOrderUrl = () => {
    navigator.clipboard.writeText(urlForOrder);
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography label="Seller URL" variant="h6" />
          <Divider sx={lineDivider} />
          <Typography
            label="Please use this URL to update seller transactions:"
            variant="caption"
            sx={{ textAlign: "center" }}
          />
          {sellerUrl ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Typography label={`${sellerUrl}`} sx={{ mt: 1 }} />
                <CopySnackBar copyToClipboard={copyToClipboard} />
              </div>
              <Divider sx={lineDivider} />
              <Typography
                label="To place an order for this seller:"
                variant="caption"
                sx={{ textAlign: "center" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Typography label={`${urlForOrder}`} sx={{ mt: 1 }} />
                <CopySnackBar copyToClipboard={copyOrderUrl} />
              </div>
            </>
          ) : (
            <Typography label="No URL" sx={{ mt: 2 }} />
          )}
          <Divider sx={lineDivider} />
        </Box>
      </Modal>
    </div>
  );
}
