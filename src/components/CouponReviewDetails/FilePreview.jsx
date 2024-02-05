import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";

const FilePreview = ({ pdfBlob }) => {
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

  // Create a Blob and URL for the PDF data
  //   const blob = new Blob([pdfData], { type: "application/pdf" });
  //   const url = URL.createObjectURL(blob);
  //   setPdfUrl(url);

  // const openPdfInNewTab = (pdf_data) => {
  //   console.log(pdf_data);
  //   const blob = new Blob([pdf_data], { type: 'application/pdf' });
  //   console.log(blob);
  //   const url = URL.createObjectURL(blob);
  //   console.log(url);

  //   // Open the URL in a new tab
  //   window.open(url, '_blank');
  // };

  // const openPdfInNewTab = (pdf_data, filename) => {
  //   const blob = new Blob([pdf_data], { type: "application/pdf" });
  //   console.log(blob);
  //   const url = URL.createObjectURL(blob);

  //   // Open the URL in a new tab
  //   window.open(url, "_blank");
  // };

  const handleButtonClick = (file, i) => {
    console.log(file);
    const couponId = i;
    console.log(couponId);
    dispatch({ type: "FETCH_PDF_FILE", payload: couponId });
    //   openPdfInNewTab(file.pdf_data, file.filename);
  };

  return (
    <div>
      {pdfUrl ? (
        <button onClick={handleOpenPdf}>Open PDF</button>
      ) : pdfBlob.length > 0 ? (
        // <p>No PDF file available</p>
        pdfBlob.map((file, i) => (
          <div key={i}>
            {file.filename}{" "}
            <button onClick={() => handleButtonClick(file, i)}>
              Open PDF {i + 1}
            </button>
          </div>
        ))
      ) : (
        <p>No PDF file available</p>
      )}
      {/* You can also display other content or components here */}
    </div>
  );
};

export default FilePreview;
