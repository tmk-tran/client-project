import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPdfRequest } from "../../redux/sagas/couponPDF.saga";

const CouponViewer = ({ couponId }) => {
  console.log(couponId);

  const dispatch = useDispatch();
  const pdfBlob = useSelector((store) => store.pdf);
  console.log(pdfBlob);

  // useEffect(() => {
  //   // Dispatch an action to fetch the PDF when the component mounts
  //   dispatch(fetchPdfRequest(couponId));
  // }, [dispatch, couponId]);

  // useEffect(() => {
  //   // Dispatch an action to fetch the PDF when the component mounts
  //   if (couponId) {
  //     dispatch(fetchPdfRequest(couponId));
  //   }
  // }, [dispatch, couponId]);

// PICK UP HERE<-- 

  // useEffect(() => {
  //   dispatch({
  //     type: "FETCH_PDF_FILE",
  //     payload: paramsObject.id,
  //   });
  // }, []);
  
  function fetchPdf(couponId) {
    console.log(couponId);
    dispatch({
      type: "FETCH_PDF_FILE",
      payload: couponId,
    });
  }

  const downloadPdf = () => {
    if (pdfBlob) {
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create a link element and simulate a click to trigger download
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `coupon_${couponId}.pdf`; // Set a meaningful file name
      document.body.appendChild(link);
      link.click();

      // Cleanup: remove the link and revoke the URL
      document.body.removeChild(link);
      URL.revokeObjectURL(pdfUrl);
    }
  };

  const openPdf = () => {
    if (pdfBlob) {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    }
  };

  return (
    <div>
      <button onClick={downloadPdf}>Download PDF</button>
      <button onClick={openPdf}>Open PDF</button>
      <button onClick={fetchPdf}>Select PDF</button>
    </div>
  );
};

export default CouponViewer;
