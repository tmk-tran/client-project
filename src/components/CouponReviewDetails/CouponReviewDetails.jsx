import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import CouponLocations from "../CouponLocations/CouponLocations";
import ToggleButton from "../ToggleButton/ToggleButton";
import EditButton from "../Buttons/EditButton";
import EditCouponModal from "./EditCouponModal";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~ //
import { dispatchHook } from "../../hooks/useDispatch";
import { couponsData, mTasks } from "../../hooks/reduxStore";
import { centeredStyle, flexCenter, flexRowSpace } from "../Utils/pageStyles";
import { grayBackground } from "../Utils/colors";
import {
  capitalizeFirstWord,
  capitalizeWords,
  formatDate,
} from "../Utils/helpers";

const uploadBoxStyle = {
  width: "100%",
  backgroundColor: "white",
  ...flexCenter,
};

export default function CouponReviewDetails() {
  const dispatch = dispatchHook();
  const params = useParams();
  const merchantId = params.merchantId;
  console.log(merchantId);
  const couponId = params.couponId;
  console.log(couponId);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  // ~~~~~~~~~~ Task Status State ~~~~~~~~~~ //
  const [isTaskUpdate, setIsTaskUpdate] = useState(false);
  console.log(isTaskUpdate);
  const [completedCoupon, setCompletedCoupon] = useState(false);
  console.log(completedCoupon);
  const [taskId, setTaskId] = useState("");
  console.log(taskId);
  const [taskStatus, setTaskStatus] = useState("");
  console.log(taskStatus);
  const [newTaskStatus, setNewTaskStatus] = useState("");
  console.log(newTaskStatus);
  // ~~~~~~~~~~ Comments State ~~~~~~~~~~ //
  const [commentAdded, setCommentAdded] = useState(false);
  console.log(commentAdded);
  const [changesRequested, setChangesRequested] = useState(false);
  console.log(changesRequested);
  // ~~~~~~~~~~ Uploaded Files State ~~~~~~~~~~ //
  const [uploadedFiles, setUploadedFiles] = useState(false);
  console.log(uploadedFiles);
  const [frontViewFile, setFrontViewFile] = useState(null);
  const [frontViewFilename, setFrontViewFilename] = useState("");
  console.log(frontViewFile);
  console.log(frontViewFilename);
  const [backViewFile, setBackViewFile] = useState(null);
  console.log(backViewFile);
  const [backViewFilename, setBackViewFilename] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  console.log(isUploaded);
  // ~~~~~~~~~~ View Locations State ~~~~~~~~~~ //
  const [showLocations, setShowLocations] = useState(false);

  const handleDenyButtonClick = () => {
    // Open the modal when Deny button is clicked
    setIsModalOpen(true);
  };

  const handleUpdateTask = (taskId, choice, taskStatus) => {
    console.log(taskId);
    console.log(choice);
    console.log(taskStatus);
    setTaskId(taskId);
    setNewTaskStatus(choice);
    setTaskStatus(taskStatus);
    setIsTaskUpdate(true);
  };

  const updateTaskState = (isCompleted) => {
    console.log(isCompleted);
    // setIsTaskUpdate(newValue);
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

  const files = couponsData() || [];
  console.log(files);
  // const file = files[0];
  const file = files.length > 0 ? files[0] : null;
  const formattedDate =
    file && file.expiration ? formatDate(file.expiration) : null;

  console.log(file);
  const tasks = mTasks() || [];
  console.log(tasks);
  // const couponTask = tasks.find((task) => task.coupon_id === Number(couponId));
  const couponTask = Array.isArray(tasks)
    ? tasks.find((task) => task.coupon_id === Number(couponId))
    : null;
  console.log(couponTask);

  useEffect(() => {
    // Ensure that merchantId is available before dispatching the action
    if (merchantId) {
      // dispatch({ type: "FETCH_MERCHANT_COMMENTS", payload: merchantId });
      // dispatch({ type: "FETCH_COUPON_COMMENTS", payload: file.taskId });
      dispatch({ type: "FETCH_MERCHANT_TASKS", payload: merchantId });
    }
    if (merchantId && file.taskId) {
      console.log(file.taskId);
      // dispatch({ type: "FETCH_COUPON_COMMENTS", payload: file.taskId });
      const action2 = {
        type: "FETCH_COUPON_COMMENTS",
        payload: file.taskId,
      };
      console.log(action2);
      dispatch(action2);
    }
    // couponId &&
    if (couponId) {
      dispatch({ type: "FETCH_PDF_FILE", payload: { merchantId, couponId } });
    }

    setChangesRequested(false);
    setCompletedCoupon(false);
    setUploadedFiles(false);
    setIsUploaded(false);
    setFrontViewFile(null);
    setBackViewFile(null);
  }, [merchantId, commentAdded, uploadedFiles, file.taskId]);

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
        setIsUploaded(true);
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

  const handleToggleLocations = () => {
    setShowLocations(!showLocations);
    console.log(showLocations);
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
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {/* ~~~~~~~~~ FRONT OF COUPON ~~~~~~~ */}
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      <div
                        style={{
                          border: "1px solid #D9D9D9",
                          width: "50%",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ ...grayBackground, textAlign: "center" }}
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
                          {frontViewFile && !isUploaded && (
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
                          border: "1px solid #D9D9D9",
                          width: "50%",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ ...grayBackground, textAlign: "center" }}
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
                              <Typography variant="caption">
                                Selected File: {backViewFile.name}
                              </Typography>
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
                          task={couponTask}
                          handleUpdateTask={handleUpdateTask}
                          onChange={handleChangeRequest}
                          complete={handleCompletedCoupon}
                        />
                        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

                        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                        {/* ~~~~~~~~~~ Coupon Details ~~~~~~~~~~  */}
                        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                        <Box sx={{ mt: 2, p: 1 }}>
                          <Box sx={flexRowSpace}>
                            <ToggleButton
                              onClick={handleToggleLocations}
                              toggleState={showLocations}
                              label1="Locations"
                              label2="Details"
                            />
                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                            {/* ~~~~~~~~~~ Edit Button ~~~~~~~~~~~ */}
                            <EditCouponModal file={file} />
                            {/* {files.map((file, index) => (
                              <EditCouponModal key={index} file={file} />
                            ))} */}
                            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                          </Box>
                          {!showLocations && (
                            <>
                              <RenderValue label="Coupon #" value={couponId} />
                              <RenderValue
                                label="Offer"
                                value={
                                  file && file.offer !== null
                                    ? capitalizeFirstWord(file.offer)
                                    : "No offer set"
                                }
                              />
                              <RenderValue
                                label="Value"
                                value={
                                  file && file.value !== null
                                    ? `$ ${file.value}`
                                    : "No value set"
                                }
                              />
                              <RenderValue
                                label="Exclusions"
                                value={
                                  file && file.exclusions !== null
                                    ? file.exclusions
                                    : "No exclusions set"
                                }
                              />
                              <RenderValue
                                label="Expiration"
                                value={formattedDate}
                              />
                            </>
                          )}
                          {showLocations && (
                            <CouponLocations locations={files} />
                          )}
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
                      taskId={taskId}
                      newTaskStatus={newTaskStatus}
                      taskStatus={taskStatus}
                      merchantId={merchantId}
                      setIsTaskUpdate={setIsTaskUpdate}
                      couponId={couponId}
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
                  file={file}
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
