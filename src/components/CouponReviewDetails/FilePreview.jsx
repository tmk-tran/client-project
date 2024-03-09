import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
// ~~~~~~~~~~ Hooks ~~~~~~~~~~
import { dispatchHook } from "../../hooks/useDispatch";
import { border } from "../Utils/colors";
import PdfThumbnail from "../PdfThumbnail/PdfThumbnail";

export const thumbnailSize = {
  height: "150px",
  width: "150px",
};

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  // position: "relative"
};

const FilePreview = ({
  pdfBlob,
  merchantId,
  showFrontViewFiles,
  showBackViewFiles,
  caseType,
  directFile,
}) => {
  console.log(merchantId);
  console.log(showFrontViewFiles);
  console.log(showBackViewFiles);
  console.log(caseType);
  const dispatch = dispatchHook();
  const [pdfUrl, setPdfUrl] = useState(null);
  console.log(pdfBlob);
  console.log(pdfUrl);
  const [isUploading, setIsUploading] = useState(false);
  console.log(isUploading);
  const [frontViewUrl, setFrontViewUrl] = useState(null);
  console.log(frontViewUrl);
  const [backViewUrl, setBackViewUrl] = useState(null);
  console.log(backViewUrl);

  const handleButtonClick = (file, type) => {
    console.log(file);
    console.log(type);
    let blob = null;

    switch (type) {
      case "pdf":
        blob = file.pdfBlob;
        break;
      case "frontView":
        blob = file.frontViewBlob;
        break;
      case "backView":
        blob = file.backViewBlob;
        break;
      default:
        break;
    }

    if (blob instanceof Blob) {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    }
  };
  console.log(directFile);

  return (
    // <div>
    //   {directFile ? (
    //     <>
    //       {showFrontViewFiles && directFile.frontViewBlob ? (
    //         <>
    //           <div style={{ display: "flex", justifyContent: "center" }}>
    //             <PdfThumbnail
    //               pdfUrl={directFile.frontViewBlob}
    //               style={thumbnailSize}
    //             />
    //           </div>
    //           {caseType !== "preview" && (
    //             <Box sx={boxStyle}>
    //               <Button
    //                 onClick={() =>
    //                   handleButtonClick(directFile, "frontView")
    //                 }
    //               >
    //                 View Front
    //               </Button>
    //             </Box>
    //           )}
    //         </>
    //       ) : (
    //         <p>No files available</p>
    //       )}
    //       {showBackViewFiles && directFile.backViewBlob && (
    //         <>
    //           <div style={{ display: "flex", justifyContent: "center" }}>
    //             <PdfThumbnail
    //               pdfUrl={directFile.backViewBlob}
    //               style={thumbnailSize}
    //             />
    //           </div>
    //           {caseType !== "preview" && (
    //             <Box sx={boxStyle}>
    //               <Button
    //                 onClick={() => handleButtonClick(directFile, "backView")}
    //               >
    //                 View Back
    //               </Button>
    //             </Box>
    //           )}
    //         </>
    //       )}
    //     </>
    //   ) : (
    //     <>
    //       {pdfBlob.length > 0 ? (
    //         pdfBlob.map((file, i) => (
    //           <div key={i}>
    //             {showFrontViewFiles && file.frontViewBlob && (
    //               <>
    //                 <div style={{ display: "flex", justifyContent: "center" }}>
    //                   <PdfThumbnail
    //                     pdfUrl={file.frontViewBlob}
    //                     style={thumbnailSize}
    //                   />
    //                 </div>
    //                 {caseType !== "preview" && (
    //                   <Box sx={boxStyle}>
    //                     {/* {file.filename}{" "} */}
    //                     <Button
    //                       onClick={() =>
    //                         handleButtonClick(file, "frontView")
    //                       }
    //                     >
    //                       View Front
    //                     </Button>
    //                   </Box>
    //                 )}
    //               </>
    //             )}
    //             {showBackViewFiles && file.backViewBlob && (
    //               <>
    //                 <div style={{ display: "flex", justifyContent: "center" }}>
    //                   <PdfThumbnail
    //                     pdfUrl={file.backViewBlob}
    //                     style={thumbnailSize}
    //                   />
    //                 </div>
    //                 {caseType !== "preview" && (
    //                   <Box sx={boxStyle}>
    //                     {/* {file.filename}{" "} */}
    //                     <Button
    //                       onClick={() => handleButtonClick(file, "backView")}
    //                     >
    //                       View Back
    //                     </Button>
    //                   </Box>
    //                 )}
    //               </>
    //             )}
    //           </div>
    //         ))
    //       ) : (
    //         <p>No files available</p>
    //       )}
    //     </>
    //   )}
    // </div>
    <div>
  {(directFile || pdfBlob.length > 0) ? (
    <>
      {directFile && (
        <>
          {showFrontViewFiles && directFile.frontViewBlob && (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <PdfThumbnail
                  pdfUrl={directFile.frontViewBlob}
                  style={thumbnailSize}
                />
              </div>
              {caseType !== "preview" && (
                <Box sx={boxStyle}>
                  <Button
                    onClick={() =>
                      handleButtonClick(directFile, "frontView")
                    }
                  >
                    View Front
                  </Button>
                </Box>
              )}
            </>
          )}
          {showBackViewFiles && directFile.backViewBlob && (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <PdfThumbnail
                  pdfUrl={directFile.backViewBlob}
                  style={thumbnailSize}
                />
              </div>
              {caseType !== "preview" && (
                <Box sx={boxStyle}>
                  <Button
                    onClick={() => handleButtonClick(directFile, "backView")}
                  >
                    View Back
                  </Button>
                </Box>
              )}
            </>
          )}
        </>
      )}
      {!directFile && pdfBlob.length > 0 && (
        <>
          {pdfBlob.map((file, i) => (
            <div key={i}>
              {showFrontViewFiles && file.frontViewBlob && (
                <>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <PdfThumbnail
                      pdfUrl={file.frontViewBlob}
                      style={thumbnailSize}
                    />
                  </div>
                  {caseType !== "preview" && (
                    <Box sx={boxStyle}>
                      {/* {file.filename}{" "} */}
                      <Button
                        onClick={() =>
                          handleButtonClick(file, "frontView")
                        }
                      >
                        View Front
                      </Button>
                    </Box>
                  )}
                </>
              )}
              {showBackViewFiles && file.backViewBlob && (
                <>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <PdfThumbnail
                      pdfUrl={file.backViewBlob}
                      style={thumbnailSize}
                    />
                  </div>
                  {caseType !== "preview" && (
                    <Box sx={boxStyle}>
                      {/* {file.filename}{" "} */}
                      <Button
                        onClick={() => handleButtonClick(file, "backView")}
                      >
                        View Back
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </div>
          ))}
        </>
      )}
      {(!directFile || !directFile.frontViewBlob || !directFile.backViewBlob) && (
        <p>No files available</p>
      )}
    </>
  ) : (
    <p>No files available</p>
  )}
</div>

  );
};

export default FilePreview;
