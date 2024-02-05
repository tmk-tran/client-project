import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";


const FilePreview = ({ pdfBlob }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  console.log(pdfBlob);
  console.log(pdfUrl);

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

    const openPdfInNewTab = (pdf_data) => {
      console.log(pdf_data);
      const blob = new Blob([pdf_data], { type: 'application/pdf' });
      console.log(blob);
      const url = URL.createObjectURL(blob);
      console.log(url);

      // Open the URL in a new tab
      window.open(url, '_blank');
    };

//   const openPdfInNewTab = (pdf_data, filename) => {
//     const blob = new Blob([pdf_data], { type: "application/pdf" });
//     const url = URL.createObjectURL(blob);

//     // Open the URL in a new tab
//     window.open(url, "_blank");
//   };

  return (
    <div>
      {pdfUrl ? (
        <button onClick={handleOpenPdf}>Open PDF</button>
      ) : (

        <p>No PDF file available</p>
        // pdfBlob.map((file, i) => (
        //   <div key={i}>
        //     {file.filename}{" "}
        //     <button onClick={() => openPdfInNewTab(file.pdf_data)}>
        //       Open PDF {i + 1}
        //     </button>
        //   </div>
        // ))
      )}
      {/* You can also display other content or components here */}
    </div>
  );
};

export default FilePreview;
