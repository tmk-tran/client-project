import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { CircularProgress } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfThumbnail = ({ pdf, style, width }) => {
  console.log(pdf);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = () => {
    setLoading(false);
  };

  return (
    <>
      {pdf ? (
        <div style={{ ...style, overflow: "hidden", position: "relative" }}>
          <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} width={width ? width : 150} />
          </Document>
          {loading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
      ) : (
        <p>No files available</p>
      )}
    </>
  );
};

export default PdfThumbnail;
