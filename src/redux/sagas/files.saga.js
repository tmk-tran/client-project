import axios from "axios";
import { put, takeEvery, all, call } from "redux-saga/effects";
import { setMerchantFiles, fetchMerchantFilesFailure } from "./actions";

function* merchantFiles(action) {
  console.log(action.payload);
  try {
    const response = yield axios.get(`/api/merchant`);
    console.log("FETCH request from merchant.saga, RESPONSE = ", response.data);
    const filesWithPdfData = yield response.data.map(function* (file) {
      const pdfResponse = yield call(axios.get, file.fileUrl, { responseType: "arraybuffer" });
      return {
        ...file,
        pdfData: pdfResponse.data,
      };
    });
    yield put(setMerchantFiles(filesWithPdfData));
  } catch (error) {
    console.log(error);
    yield put(fetchMerchantFilesFailure(error.message));
  }
}

function* pdfUpload(action) {
  const { pdfFile } = action.payload;

  try {
    const formData = new FormData();
    formData.append("pdf", pdfFile);

    const response = yield axios.post(`/api/merchant/`, formData);
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
  yield takeEvery("FETCH_MERCHANT_FILES", merchantFiles);
  yield takeEvery("UPLOAD_PDF_REQUEST", pdfUpload);
}
