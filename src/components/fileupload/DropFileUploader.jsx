import { useRef, useState } from "react";
import axios from "axios";

const allowedFileTypes = ["csv", "xls", "xlsx", "json", "parquet"];

const DropFileUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const isValidFile = (file) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return allowedFileTypes.includes(fileExtension);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile);
      setError(null);
    } else {
      setError(
        "Invalid file type. Please upload only CSV, Excel, JSON, or Parquet files.",
      );
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && isValidFile(selectedFile)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError(
        "Invalid file type. Please upload only CSV, Excel, JSON, or Parquet files.",
      );
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected for upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadStatus("Uploading...");
      const response = await axios.post(
        "http://localhost:8000/upload-data/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setUploadStatus("File uploaded successfully!");
      console.log("Response:", response.data);

      onUploadSuccess(); // Trigger data fetch in ChartDisplay
    } catch (error) {
      if (error.response) {
        console.error("Upload error:", error.response.data);
        setError(error.response.data.detail);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        setError("Server not responding");
      } else {
        console.error("Unexpected error:", error.message);
        setError(`Unexpected error: ${error.message}`);
      }
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-3xl h-60 bg-[var(--color-bg-secondary)] border border-[var(--color-bg-tertiary)] rounded-2xl"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {!file ? (
        <>
          <p className="m-10">
            Visualize your data easily and securely.
          </p>
          <input
            type="file"
            onChange={handleFileChange}
            hidden
            ref={inputRef}
          />

          <button
            className="w-1/4 py-5 rounded-lg bg-black"
            onClick={() => inputRef.current.click()}
          >
            Choose File
          </button>
          <p className="text-sm m-2">Max file size 5MB</p>
        </>
      ) : (
        <>
          <h2>Selected File:</h2>
          <p>{file.name}</p>
          <button
            className="text-xl w-40 py-3 m-5 border-0 border-r-4 rounded-lg"
            onClick={handleUpload}
          >
            Upload File
          </button>
        </>
      )}

      {uploadStatus && <p>{uploadStatus}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DropFileUploader;