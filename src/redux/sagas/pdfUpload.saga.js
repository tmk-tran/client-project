import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* pdfUpload(action) {
  const { pdfFile } = action.payload;

  try {
    const formData = new FormData();
    formData.append("pdf", pdfFile);

    const items = yield axios.put(`/api/merchant/`, formData);
    console.log("ITEMS from uploadPdf = ", items);
    // Assuming you have an API endpoint like /api/merchant/:id/upload-pdf
    // yield call(axios.put, `/api/merchant/upload-pdf`, formData);

    // Dispatch a success action if needed
    yield put({ type: "UPLOAD_PDF_SUCCESS", payload: items.data });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    // Dispatch a failure action if needed
    yield put({ type: "UPLOAD_PDF_FAILURE", payload: "Error uploading PDF" });
  }
}

function* pdfUploadSaga() {
  yield takeEvery("UPLOAD_PDF_REQUEST", pdfUpload);
}

export default pdfUploadSaga;
