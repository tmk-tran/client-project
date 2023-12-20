import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPdfRequest } from "../../redux/sagas/files.saga";

const CouponViewer = ({ couponId }) => {
  const dispatch = useDispatch();
  const pdfBlob = useSelector((store) => store.coupon);

  useEffect(() => {
    // Dispatch an action to fetch the PDF when the component mounts
    dispatch(fetchPdfRequest(couponId));
  }, [dispatch, couponId]);

  const openPdf = () => {
    if (pdfBlob) {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
    }
  };

  return (
    <div>
      <button onClick={openPdf}>Open PDF</button>
    </div>
  );
};

export default CouponViewer;
