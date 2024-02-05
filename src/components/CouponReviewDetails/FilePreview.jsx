import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";

const FilePreview = ({ pdfBlob, merchantId }) => {
  console.log(merchantId);
  const dispatch = dispatchHook();
  const [pdfUrl, setPdfUrl] = useState(null);
  console.log(pdfBlob);
  console.log(pdfUrl);

  // START HERE, NEED TO SET UP STATE FOR SHOWING ALL FILES, AND RESET TO SHOW
  // FILES AFTER VIEWING

  useEffect(() => {
    if (pdfBlob instanceof Blob) {
      console.log(pdfBlob instanceof Blob);
      // Create a URL for the Blob object
      setPdfUrl(URL.createObjectURL(pdfBlob));
    }
  }, [pdfBlob]);

  const handleOpenPdf = () => {
    if (pdfUrl) {
      // Open the PDF file in a new tab
      window.open(pdfUrl, "_blank");
    }
  };

  const handleButtonClick = (file) => {
    console.log(file);
    console.log(file.pdfBlob);

    const url = URL.createObjectURL(file.pdfBlob);
    console.log(url);
    window.open(url, "_blank");
  };

  return (
    <div>
      {pdfUrl ? (
        <button onClick={handleOpenPdf}>Open PDF</button>
      ) : pdfBlob.length > 0 ? (
        pdfBlob.map((file, i) => (
          <div key={i}>
            {file.filename}{" "}
            <button onClick={() => handleButtonClick(file, i)}>View PDF</button>
          </div>
        ))
      ) : (
        <p>No PDF files available</p>
      )}
      {/* You can also display other content or components here */}
    </div>
  );
};

export default FilePreview;
