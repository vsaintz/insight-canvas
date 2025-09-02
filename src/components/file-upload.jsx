import { useRef, useState } from "react"
import { motion } from "motion/react"
import { Upload, X } from "lucide-react"
import { useDropzone } from "react-dropzone"
import axios from "axios"

import { cn } from "@/lib/utils"
import { API_BASE } from "@/config"
import ErrorPopup from "@/components/ui/error-popup"

const allowedFileTypes = ["csv", "xls", "xlsx", "json"]
const maxFileSize = 5 * 1024 * 1024

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
}

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

export const FileUpload = ({ onChange, onUploadSuccess }) => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  const validateFile = (newFile) => {
    const ext = newFile.name.split(".").pop().toLowerCase()
    if (!allowedFileTypes.includes(ext)) {
      setError("Invalid file type! Please upload only csv, excel, or json files")
      return false
    }
    if (newFile.size > maxFileSize) {
      setError("File size exceeds 5mb limit")
      return false
    }
    return true
  }

  const handleFileChange = (newFiles) => {
    const selected = newFiles[0]
    if (selected && validateFile(selected)) {
      setFile(selected)
      onChange && onChange(selected)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = () => {
    setFile(null)
    onChange && onChange(null)
  }

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: (accepted) => handleFileChange(accepted),
    onDropRejected: (error) => {
      console.log(error)
    },
  })

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file before uploading")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)
      const response = await axios.post(
        `${API_BASE}/upload-data/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      console.log("Response:", response.data)
      onUploadSuccess()
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.detail || "Upload failed")
      } else if (err.request) {
        setError("No response from server")
      } else {
        setError("Unexpected error: " + err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xls,.xlsx,.json"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Upload file
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your files here or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {file ? (
              <motion.div
                layoutId="file-upload"
                className={cn(
                  "relative z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start p-4 mt-4 w-full mx-auto rounded-md",
                  "shadow-sm"
                )}
              >

                <div className="flex justify-between w-full items-center gap-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                  >
                    {file.name}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                  >
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </motion.p>
                </div>

                <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                  >
                    {file.type}
                  </motion.p>

                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
                    modified {new Date(file.lastModified).toLocaleDateString()}
                  </motion.p>
                </div>

                <div className="m-auto mt-5 flex gap-5 items-center">
                  {loading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 300 150"
                      width="30"
                      height="30"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="300 385"
                        strokeDashoffset="0"
                        d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          calcMode="spline"
                          dur="2s"
                          values="685;-685"
                          keySplines="0 0 1 1"
                          repeatCount="indefinite"
                        />
                      </path>
                    </svg>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation() // prevent triggering hidden input
                        handleUpload()
                      }}
                      disabled={loading}
                      className="px-4 py-2 text-sm text-text-primary rounded-md border border-border hover:bg-bg-primary"
                    > Upload
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile()
                    }}
                    className="px-4 py-2 text-sm text-text-primary rounded-md border border-border hover:bg-bg-primary"
                  >
                    Clear
                  </button>
                </div>

              </motion.div>
            ) : (
              <>
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col items-center"
                    >
                      Drop it
                      <Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </motion.p>
                  ) : (
                    <Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                  )}
                </motion.div>

                <motion.div
                  variants={secondaryVariant}
                  className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                ></motion.div>
              </>
            )}
          </div>
        </div>
      </motion.div>
      {error && (
        <ErrorPopup
          message={error}
          duration={2000}
          onClose={() => setError(null)}
        />
      )}
    </div>
  )
}

export function GridPattern() {
  const columns = 41
  const rows = 11
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${index % 2 === 0
                ? "bg-gray-50 dark:bg-neutral-950"
                : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                }`}
            />
          )
        })
      )}
    </div>
  )
}

export default FileUpload
