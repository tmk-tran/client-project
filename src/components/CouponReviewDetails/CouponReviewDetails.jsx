import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// ~~~~~~~~~~ Style ~~~~~~~~~~
import { Typography, Card, CardContent, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { border } from "../Utils/colors";
// ~~~~~~~~~~ Components ~~~~~~~~~~
import DenyProofModal from "../DenyProofModal/DenyProofModal";
import CouponStatusDropdown from "../CouponStatusDropdown/CouponStatusDropdown";
import CouponReviewButtons from "./CouponReviewButtons";
import CouponReviewComments from "./CouponReviewComments";
import BackButton from "../Buttons/BackButton";
import FilePreview from "./FilePreview";
import UploadFileButton from "./UploadFileButton";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { pdfFile } from "../../hooks/reduxStore";

const bottomBoxStyle = {
  // position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  ...border,
};

export default function CouponReviewDetails() {
  const dispatch = dispatchHook();
  const params = useParams();
  console.log(params.id);
  const merchantId = params.id;
  console.log(merchantId);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskUpdate, setIsTaskUpdate] = useState(false);
  console.log(isTaskUpdate);
  const [commentAdded, setCommentAdded] = useState(false);
  console.log(commentAdded);
  const [changesRequested, setChangesRequested] = useState(false);
  console.log(changesRequested);
  const [completedCoupon, setCompletedCoupon] = useState(false);
  console.log(completedCoupon);
  const [uploadedFiles, setUploadedFiles] = useState(false);
  console.log(uploadedFiles);
  const [frontViewFile, setFrontViewFile] = useState(null);
  const [frontViewFilename, setFrontViewFilename] = useState("");
  const [backViewFile, setBackViewFile] = useState(null);
  const [backViewFilename, setBackViewFilename] = useState("");

  const handleDenyButtonClick = () => {
    // Open the modal when Deny button is clicked
    setIsModalOpen(true);
  };

  const handleUpdateTask = (choice) => {
    console.log(choice);
    setIsTaskUpdate(true);
  };

  const updateTaskState = (newValue) => {
    setIsTaskUpdate(newValue);
  };

  const updateComments = () => {
    setCommentAdded(true);
  };

  const handleChangeRequest = (newValue) => {
    // setChangesRequested(newValue);
    console.log("Changes requested: ", changesRequested);
  };

  const handleCompletedCoupon = () => {
    // setCompletedCoupon(true);
    console.log("Completed coupon: ", completedCoupon);
  };

  const handleUploadFile = () => {
    setUploadedFiles(true);
  };

  const couponId = 6;
  console.log(couponId);

  useEffect(() => {
    // Ensure that merchantId is available before dispatching the action
    if (merchantId) {
      dispatch({ type: "FETCH_MERCHANT_COMMENTS", payload: merchantId });
    }
    // dispatch({ type: "FETCH_COUPON_FILES", payload: merchantId });
    dispatch({ type: "FETCH_PDF_FILE", payload: merchantId });

    setUploadedFiles(false);
  }, [merchantId, commentAdded, uploadedFiles]); //Deleted dispatch from dependencies

  const files = pdfFile() || [];
  console.log(files);

  // ~~~~~~~~~~ FRONT VIEW UPLOAD FUNCTIONS ~~~~~~~~~~ //
  const handleFrontViewUpload = (selectedFile, addedFileName) => {
    console.log(selectedFile, addedFileName);

    setFrontViewFile(selectedFile);
    setFrontViewFilename(addedFileName);
    console.log(frontViewFile);
    console.log(frontViewFilename);
  };

  const handleFrontUpload = () => {
    if (frontViewFile) {
      // Check if the selected file is a PDF
      if (frontViewFile.type === "application/pdf") {
        // Dispatch the action for uploading PDF
        console.log(frontViewFile);
        console.log(frontViewFilename);
        const frontViewAction = {
          type: "UPLOAD_FRONT_VIEW_PDF",
          payload: {
            frontViewFile: frontViewFile,
            frontViewFileName: frontViewFilename,
            merchantId: merchantId,
          },
        };
        console.log(frontViewAction);
        dispatch(frontViewAction);
        setFrontViewFile(null);
        // onUploadFile();
      } else {
        // Alert the user if the selected file is not a PDF
        alert("Please select a PDF file");
      }
    } else {
      // Alert the user if no file is selected
      alert("No file selected");
    }
  };

  // ~~~~~~~~~~ BACK VIEW UPLOAD FUNCTIONS ~~~~~~~~~~ //
  const handleBackViewUpload = (selectedFile, addedFileName) => {
    console.log(selectedFile, addedFileName);

    setBackViewFile(selectedFile);
    setBackViewFilename(addedFileName);
  };

  const handleBackUpload = () => {
    if (backViewFile) {
      // Check if the selected file is a PDF
      if (backViewFile.type === "application/pdf") {
        // Dispatch the action for uploading PDF
        console.log(backViewFile);
        console.log(backViewFilename);
        const backViewAction = {
          type: "UPLOAD_BACK_VIEW_PDF",
          payload: {
            backViewFile: backViewFile,
            backViewFileName: backViewFilename,
            merchantId: merchantId,
          },
        };
        console.log(backViewAction);
        dispatch(backViewAction);
        setBackViewFile(null);
        // onUploadFile();
      } else {
        // Alert the user if the selected file is not a PDF
        alert("Please select a PDF file");
      }
    } else {
      // Alert the user if no file is selected
      alert("No file selected");
    }
  };

  return (
    <div className={`details-container ${isSmallScreen ? "small-screen" : ""}`}>
      <Box className="details-card">
        <div className="detailsView-container">
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* ~~~~~~~~~~ BACK BUTTON ~~~~~~~~~~ */}
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <BackButton />
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                flexGrow: 1,
              }}
            >
              Coupon Details
            </Typography>
          </div>

          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          <Card style={{ width: "50vw", margin: "0 auto" }} elevation={3}>
            <CardContent>
              <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                <div style={{ width: "25vw" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 15,
                    }}
                  >
                    <div>
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {/* ~~~~~~~~~ FRONT OF COUPON ~~~~~~~ */}
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      <div
                        style={{
                          backgroundColor: "#D9D9D9",
                        }}
                      >
                        <Typography variant="body2" sx={{ textAlign: "center" }}>
                          Front of Coupon
                        </Typography>
                        {/* {files.map((file, i) => (
                          <FilePreview
                            key={i}
                            pdfBlob={file.frontViewBlob}
                          />
                        ))} */}
                        {/* <Box
                          sx={{
                            border: "1px solid blue",
                            position: "relative",
                          }}
                        >
                          <FilePreview
                            pdfBlob={files}
                            showFrontViewFiles={true}
                            showBackViewFiles={false}
                          />
                          {frontViewFile && (
                            <div>
                              <p>Selected File: {frontViewFile.name}</p>
                              <button onClick={handleFrontUpload}>
                                Upload
                              </button>
                            </div>
                          )}
                            <UploadFileButton
                              onFileSelect={handleFrontViewUpload}
                              />
                        </Box> */}
                              {/* <Box style={bottomBoxStyle}> */}
                          {/* </Box> */}
                      </div>
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                    </div>

                    <div>
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {/* ~~~~~~~~~ BACK OF COUPON ~~~~~~~~ */}
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      <div
                        style={{
                          // height: "18vh",
                          backgroundColor: "#D9D9D9",
                        }}
                      >
                        <Typography variant="body2" sx={{ textAlign: "center" }}>
                          Back of Coupon
                        </Typography>
                        {/* <Box sx={{ position: "relative" }}>
                          <FilePreview
                            pdfBlob={files}
                            showBackViewFiles={true}
                            showFrontViewFiles={false}
                          />
                          {backViewFile && (
                            <div>
                              <p>Selected File: {backViewFile.name}</p>
                              <button onClick={handleBackUpload}>Upload</button>
                            </div>
                          )}
                          <Box sx={bottomBoxStyle}>
                            <UploadFileButton
                              onFileSelect={handleBackViewUpload}
                            />
                          </Box>
                        </Box> */}
                      </div>
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                    </div>

                    <div>
                      <div
                        style={{
                          // height: "15vh",
                          backgroundColor: "rgba(96, 96, 96, 0.1)",
                        }}
                      >
                        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                        {/* ~~~~~~~~~~~~ STATUS ~~~~~~~~~~~~~ */}
                        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                        <CouponStatusDropdown
                          handleUpdateTask={handleUpdateTask}
                          onChange={handleChangeRequest}
                          complete={handleCompletedCoupon}
                        />
                        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                        <Typography
                          variant="body2"
                          sx={{ textAlign: "center", mt: 2 }}
                        >
                          Details of Coupon
                        </Typography>
                      </div>
                    </div>
                    {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                    {/* ~~~~~~~~~~~ BUTTONS ~~~~~~~~~~~~~ */}
                    {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                    <CouponReviewButtons
                      onDenyButtonClick={handleDenyButtonClick}
                      isTaskUpdate={isTaskUpdate}
                      updateTaskState={updateTaskState}
                      changesRequested={changesRequested}
                      completedCoupon={completedCoupon}
                    />
                    {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                    {isModalOpen && (
                      <DenyProofModal onClose={() => setIsModalOpen(false)} />
                    )}
                  </div>
                </div>
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                {/* ~~~~~~~~~~~~ COMMENTS ~~~~~~~~~~~ */}
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                <CouponReviewComments
                  merchantId={merchantId}
                  onSubmit={updateComments}
                  files={files}
                  handleUploadFile={handleUploadFile}
                />
                {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
              </div>
            </CardContent>
          </Card>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        </div>
      </Box>
    </div>
  );
}
