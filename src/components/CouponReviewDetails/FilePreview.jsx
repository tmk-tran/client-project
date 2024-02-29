import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { border } from "../Utils/colors";
import PdfThumbnail from "../PdfThumbnail/PdfThumbnail";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  position: "relative",
  zIndex: 1,
};

const FilePreview = ({
  pdfBlob,
  merchantId,
  showFrontViewFiles,
  showBackViewFiles,
}) => {
  console.log(merchantId);
  console.log(showFrontViewFiles);
  console.log(showBackViewFiles);
  const dispatch = dispatchHook();
  const [pdfUrl, setPdfUrl] = useState(null);
  console.log(pdfBlob);
  console.log(pdfUrl);
  const [isUploading, setIsUploading] = useState(false);
  console.log(isUploading);
  const [frontViewUrl, setFrontViewUrl] = useState(null);
  console.log(frontViewUrl);
  const [backViewUrl, setBackViewUrl] = useState(null);
  console.log(backViewUrl);

  const handleButtonClick = (file, i, type) => {
    let blob = null;

    switch (type) {
      case "pdf":
        blob = file.pdfBlob;
        break;
      case "frontView":
        blob = file.frontViewBlob;
        break;
      case "backView":
        blob = file.backViewBlob;
        break;
      default:
        break;
    }

    if (blob instanceof Blob) {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    }
  };

  return (
    <div>
      {pdfBlob.length > 0 ? (
        pdfBlob.map((file, i) => (
          <div key={i}>
            {showFrontViewFiles && file.frontViewBlob && (
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PdfThumbnail
                    pdfUrl={file.frontViewBlob}
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                <Box sx={boxStyle}>
                  {/* {file.filename}{" "} */}
                  <Button
                    onClick={() => handleButtonClick(file, i, "frontView")}
                  >
                    View Front
                  </Button>
                </Box>
              </>
            )}
            {showBackViewFiles && file.backViewBlob && (
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PdfThumbnail
                    pdfUrl={file.backViewBlob}
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
                <Box sx={boxStyle}>
                  {/* {file.filename}{" "} */}
                  <Button
                    onClick={() => handleButtonClick(file, i, "backView")}
                  >
                    View Back
                  </Button>
                </Box>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No files available</p>
      )}
    </div>
  );
};

export default FilePreview;
