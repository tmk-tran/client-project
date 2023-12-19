import axios from "axios";
import { put, takeEvery, call } from "redux-saga/effects";
import { setCouponFiles, fetchCouponFilesFailure } from "./actions";

function* couponFiles(action) {
  try {
    const response = yield axios.get(`/api/coupon`);
    console.log("FETCH request from coupon.saga, RESPONSE = ", response.data);

    // const filesWithPdfData = yield Promise.all(
    //   response.data.map(function* (file) {
    //     const pdfResponse = yield call(axios.get, file.fileUrl, { responseType: "arraybuffer" });
    //       // Return an object with metadata and PDF data
    //       return {
    //         pdf_Data: pdfResponse.data,
    //         filename: file,
    //       };
    //   })
    // );
    // Filter out any failed PDF fetches
    // const successfulFilesWithPdfData = filesWithPdfData.filter(fileData => fileData !== null);
    // console.log("successfulFilesWithPdfData = ", successfulFilesWithPdfData);
    // Dispatch the successful results to the Redux store
    const successfulFilesWithPdfData = response.data;
    yield put(setCouponFiles(successfulFilesWithPdfData));    
  } catch (error) {
    console.log(error);
    yield put(fetchCouponFilesFailure(error.message));
  }
}

function* pdfUpload(action) {
  const { pdfFile } = action.payload;

  try {
    const formData = new FormData();
    formData.append("pdf", pdfFile);

    const response = yield axios.post(`/api/coupon/`, formData);
    console.log("RESPONSE from uploadPdf = ", response.data);

    const uploadedPdfInfo = response.data;

    // Dispatch a success action if needed
    yield put({ type: "UPLOAD_PDF_SUCCESS", payload: uploadedPdfInfo });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    // Dispatch a failure action if needed
    yield put({ type: "UPLOAD_PDF_FAILURE", payload: "Error uploading PDF" });
  }
}

export default function* filesSaga() {
  yield takeEvery("FETCH_COUPON_FILES", couponFiles);
  yield takeEvery("UPLOAD_PDF_REQUEST", pdfUpload);
}
