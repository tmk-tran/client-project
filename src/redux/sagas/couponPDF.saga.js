import axios from "axios";
import { put, takeEvery, call } from "redux-saga/effects";
import { setCouponFiles, fetchCouponFilesFailure } from "./actions";

const fetchPdfRequest = (couponId) => ({
  type: "FETCH_PDF_FILE",
  payload: couponId,
});

const fetchPdfSuccess = (pdfBlob) => ({
  type: "FETCH_PDF_SUCCESS",
  payload: pdfBlob,
});

const fetchPdf = (pdfBlob) => ({
  type: "GET_PDF",
  payload: pdfBlob,
});

function* couponFiles(action) {
  console.log(action);

  try {
    const response = yield axios.get(`/api/coupon`);
    console.log(
      "FETCH request from couponPDF.saga, RESPONSE = ",
      response.data
    );

    // Dispatch the successful results to the Redux store
    const files = response.data;

    // Map the data received from the server
    const formattedFiles = files.map((coupon) => {
      const formattedFile = {
        pdfBlob: null,
        filename: coupon.filename,
        frontViewBlob: null,
        backViewBlob: null,
      };

      if (coupon.pdf_data && coupon.pdf_data.data) {
        formattedFile.pdfBlob = new Blob(
          [Uint8Array.from(coupon.pdf_data.data)],
          { type: "application/pdf" }
        );
      }

      if (coupon.front_view_pdf && coupon.front_view_pdf.data) {
        formattedFile.frontViewBlob = new Blob(
          [Uint8Array.from(coupon.front_view_pdf.data)],
          { type: "application/pdf" }
        );
      }

      if (coupon.back_view_pdf && coupon.back_view_pdf.data) {
        formattedFile.backViewBlob = new Blob(
          [Uint8Array.from(coupon.back_view_pdf.data)],
          { type: "application/pdf" }
        );
      }

      return formattedFile;
    });

    console.log("FORMATTED FILES = ", formattedFiles);

    // Dispatch the formatted data to the Redux store
    yield put({ type: "SET_COUPON_FILES", payload: formattedFiles });
  } catch (error) {
    console.log("Error in couponPDF.saga: ", error);
    yield put(fetchCouponFilesFailure(error.message));
  }
}

function* pdfFile(action) {
  console.log(action);
  const couponId = action.payload;
  console.log(couponId);

  try {
    const response = yield axios.get(`/api/coupon/${couponId}`);
    console.log("FETCH request from coupon.saga, RESPONSE = ", response.data);

    // Dispatch the successful results to the Redux store
    const files = response.data;

    // Map the data received from the server
    const formattedFiles = files.map((coupon) => {
      const formattedFile = {
        pdfBlob: null,
        filename: coupon.filename,
        frontViewBlob: null,
        backViewBlob: null,
      };

      if (coupon.pdf_data && coupon.pdf_data.data) {
        formattedFile.pdfBlob = new Blob(
          [Uint8Array.from(coupon.pdf_data.data)],
          { type: "application/pdf" }
        );
      }

      if (coupon.front_view_pdf && coupon.front_view_pdf.data) {
        formattedFile.frontViewBlob = new Blob(
          [Uint8Array.from(coupon.front_view_pdf.data)],
          { type: "application/pdf" }
        );
      }

      if (coupon.back_view_pdf && coupon.back_view_pdf.data) {
        formattedFile.backViewBlob = new Blob(
          [Uint8Array.from(coupon.back_view_pdf.data)],
          { type: "application/pdf" }
        );
      }

      return formattedFile;
    });

    console.log("FORMATTED FILES = ", formattedFiles);

    yield put({ type: "SET_COUPON_FILES", payload: formattedFiles });
  } catch (error) {
    console.log("Error in GET for couponPDF by merchantId", error);
  }
}

function* pdfUpload(action) {
  const { selectedFile } = action.payload;
  console.log(selectedFile);

  try {
    const formData = new FormData();
    formData.append("pdf", selectedFile);

    const response = yield axios.post(`/api/coupon`, formData);
    console.log("RESPONSE from uploadPdf = ", response.data);

    const uploadedPdfInfo = response.data;

    // Dispatch a success action if needed
    yield put({ type: "UPLOAD_PDF_SUCCESS", payload: uploadedPdfInfo });
  } catch (error) {
    console.log("Error uploading PDF:", error);
    // Dispatch a failure action if needed
    yield put({ type: "UPLOAD_PDF_FAILURE", payload: "Error uploading PDF" });
  }
}

function* frontViewUpload(action) {
  const { selectedFile, merchantId } = action.payload;
  console.log(selectedFile);

  try {
    const formData = new FormData();
    formData.append("front_view_pdf", selectedFile);

    const response = yield axios.post(`/api/coupon/front/${merchantId}`, formData);
    console.log("RESPONSE from uploadPdf = ", response.data);

    const uploadedPdfInfo = response.data;

    // Dispatch a success action if needed
    yield put({ type: "FETCH_PDF_FILE", payload: uploadedPdfInfo });
  } catch (error) {
    console.log("Error uploading PDF:", error);
  }
}

export default function* couponPDFSaga() {
  yield takeEvery("FETCH_COUPON_FILES", couponFiles); // this call will come from Coupon component
  yield takeEvery("FETCH_PDF_FILE", pdfFile); // place this call in the component that is viewed after clicking on the file (with its id)
  yield takeEvery("UPLOAD_PDF_REQUEST", pdfUpload);
  yield takeEvery("UPLOAD_FRONT_VIEW_PDF", frontViewUpload);
}

export { fetchPdfRequest };
