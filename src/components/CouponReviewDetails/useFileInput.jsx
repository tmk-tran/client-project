import React, { useState } from "react";

const useFileInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [addedFileName, setAddedFileName] = useState("");

  console.log(addedFileName);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected File:", file);
    console.log(file.name);
    setAddedFileName(file.name);
    setSelectedFile(file);
  };

  return { selectedFile, addedFileName, handleFileChange };
};

export default useFileInput;
