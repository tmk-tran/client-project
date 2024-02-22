import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~~~~~
import { generateSellerUrl } from "../SellerPage/sellerUtils";
// ~~~~~~~~~~ Components ~~~~~~~~~~~~~~
import CopySnackBar from "./CopySnackbar";
import { lineDivider } from "../Utils/modalStyles";

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

  useEffect(() => {
    if (sellerRefId) {
      setSellerUrl(generateSellerUrl(sellerRefId));
    }
  }, [sellerRefId]);

  const onClose = () => {
    close();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sellerUrl);
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Seller URL
          </Typography>
          <Typography variant="caption" sx={{ textAlign: "center" }}>
            Please use this URL to update seller transactions
          </Typography>
          <Divider sx={lineDivider} />
          {sellerUrl ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Typography sx={{ mt: 1 }}>{sellerUrl}</Typography>
              <CopySnackBar copyToClipboard={copyToClipboard} />
            </div>
          ) : (
            <Typography sx={{ mt: 2 }}>No URL</Typography>
          )}
          <Divider sx={lineDivider} />
        </Box>
      </Modal>
    </div>
  );
}
