import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FilePreview from "./FilePreview"; // Assume you have a component for displaying file previews

const PDFList = () => {
  const dispatch = useDispatch();
  const pdfFiles = useSelector((state) => state.pdfFiles); // Assuming pdfFiles is the state key containing your array

  const handleOpenPDF = (pdfData) => {
    // Dispatch an action to handle opening the PDF in a new window
    dispatch({ type: "OPEN_PDF", payload: pdfData });
  };

  return (
    <div>
      <h2>List of PDF Files</h2>
      {pdfFiles.map((pdf, index) => (
        <div key={index}>
          <FilePreview pdfData={pdf.pdf_data} />
          <button onClick={() => handleOpenPDF(pdf.pdf_data)}>
            Open PDF {index + 1}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PDFList;
