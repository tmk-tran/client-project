import React, { useState, useEffect } from 'react';

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
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <div>
      {pdfUrl ? (
        <button onClick={handleOpenPdf}>Open PDF</button>
      ) : (
        <p>No valid PDF available</p>
      )}
      {/* You can also display other content or components here */}
    </div>
  );
};

export default FilePreview;
