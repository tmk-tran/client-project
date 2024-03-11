import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
// ~~~~~~~~~~ Style ~~~~~~~~~~ //
import { Typography, Card, CardContent, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { border } from "../Utils/colors";
// ~~~~~~~~~~ Components ~~~~~~~~~~ //
import DenyProofModal from "../DenyProofModal/DenyProofModal";
import CouponStatusDropdown from "../CouponStatusDropdown/CouponStatusDropdown";
import CouponReviewButtons from "./CouponReviewButtons";
import CouponReviewComments from "./CouponReviewComments";
import BackButton from "../Buttons/BackButton";
import FilePreview from "./FilePreview";
import UploadFileButton from "./UploadFileButton";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~ //
import { dispatchHook } from "../../hooks/useDispatch";
import { pdfFile } from "../../hooks/reduxStore";
import { centeredStyle, flexCenter } from "../Utils/pageStyles";
import { grayBackground } from "../Utils/colors";

const uploadBoxStyle = {
  width: "100%",
  backgroundColor: "white",
  ...flexCenter,
};

export default function CouponReviewDetails() {
  const dispatch = dispatchHook();
  const location = useLocation();
  const couponId = location.state?.couponId ?? "";
  console.log(couponId);
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
  console.log(backViewFile);
  const [backViewFilename, setBackViewFilename] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

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

  const handleChangeRequest = (boolean) => {
    setChangesRequested(boolean);
    console.log("Changes requested? ", changesRequested);
  };

  const handleCompletedCoupon = (boolean) => {
    setCompletedCoupon(boolean);
    console.log("Completed coupon? ", completedCoupon);
  };

  const handleUploadFile = () => {
    setUploadedFiles(true);
  };

  // const couponId = 6;
  // console.log(couponId);

  useEffect(() => {
    // Ensure that merchantId is available before dispatching the action
    if (merchantId) {
      dispatch({ type: "FETCH_MERCHANT_COMMENTS", payload: merchantId });
    }
    couponId &&
      dispatch({ type: "FETCH_PDF_FILE", payload: { merchantId, couponId } });

    setUploadedFiles(false);
  }, [merchantId, commentAdded, uploadedFiles]); //Deleted dispatch from dependencies

  const files = pdfFile() || [];
  console.log(files);
  const file = files[0];
  console.log(file);

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
            id: couponId,
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
            id: couponId,
          },
        };
        console.log(backViewAction);
        dispatch(backViewAction);
        setIsUploaded(true); // Set isUploaded to true after successful upload
        // onUploadFile();
      } else {
        // Alert the user if the selected file is not a PDF
        alert("Please select a PDF file");
      }
    } else {
      // Alert the user if no file is selected
      alert("No file selected");
    }
    handleUploadFile();
  };

  const RenderValue = ({ label, value }) => (
    <Typography>
      <strong>{label}: </strong>
      {value !== null ? value : "No " + label.toLowerCase() + " set"}
    </Typography>
  );

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
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {/* ~~~~~~~~~ FRONT OF COUPON ~~~~~~~ */}
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      <div
                        style={{
                          ...grayBackground,
                          border: "1px solid #D9D9D9",
                          width: "50%",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ textAlign: "center" }}
                        >
                          Front of Coupon
                        </Typography>
                        <Box
                          sx={{
                            ...centeredStyle,
                          }}
                        >
                          <FilePreview
                            directFile={file}
                            showFrontViewFiles={true}
                            showBackViewFiles={false}
                          />
                          {frontViewFile && (
                            <div>
                              <Typography variant="caption">
                                Selected File: {frontViewFile.name}
                              </Typography>
                              <Button
                                variant="contained"
                                fullWidth
                                onClick={handleFrontUpload}
                              >
                                Upload
                              </Button>
                            </div>
                          )}
                          <Box sx={uploadBoxStyle}>
                            <UploadFileButton
                              onFileSelect={handleFrontViewUpload}
                              title="Upload Front View PDF"
                            />
                          </Box>
                        </Box>
                      </div>
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {/* ~~~~~~~~~ BACK OF COUPON ~~~~~~~~ */}
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      <div
                        style={{
                          ...grayBackground,
                          border: "1px solid #D9D9D9",
                          width: "50%",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ textAlign: "center" }}
                        >
                          Back of Coupon
                        </Typography>
                        <Box sx={{ position: "relative", ...centeredStyle }}>
                          <FilePreview
                            directFile={file}
                            showBackViewFiles={true}
                            showFrontViewFiles={false}
                          />
                          {backViewFile && !isUploaded && (
                            <div>
                              <p>Selected File: {backViewFile.name}</p>
                              <Button
                                variant="contained"
                                fullWidth
                                onClick={handleBackUpload}
                              >
                                Upload
                              </Button>
                            </div>
                          )}
                          <Box sx={uploadBoxStyle}>
                            <UploadFileButton
                              onFileSelect={handleBackViewUpload}
                              title="Upload Back View PDF"
                            />
                          </Box>
                        </Box>
                      </div>
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                    </Box>

                    <div>
                      <Box
                        sx={{
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

                        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                        {/* ~~~~~~~~~~ Coupon Details ~~~~~~~~~~  */}
                        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                        <Box sx={{ mt: 2, p: 1 }}>
                          <RenderValue label="Offer" value={file.offer} />
                          <RenderValue label="Value" value={file.value} />
                          <RenderValue
                            label="Exclusions"
                            value={file.exclusions}
                          />
                          <RenderValue
                            label="Expiration"
                            value={file.expiration}
                          />
                        </Box>
                      </Box>
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
