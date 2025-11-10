import { useState, useEffect } from "react"
import axios from "axios"

import { API_BASE } from "@/config"
import { BadgeCheck } from "lucide-react"

const chartRequirements = {
  line: {
    requiredColumns: 2,
    description: "Select one category and one value column",
  },
  bar: {
    requiredColumns: 2,
    description: "Select one category and one value column",
  },
  horizontalBar: {
    requiredColumns: 2,
    description: "Select one category and one value column (horizontal)",
  },
  radar: {
    requiredColumns: 2,
    description: "Select multiple categories and values for each",
  },
  donut: {
    requiredColumns: 2,
    description: "Select one category and one value column",
  },
  pie: {
    requiredColumns: 2,
    description: "Select one category and one value column",
  },
  polarArea: {
    requiredColumns: 2,
    description: "Select one category and one value column",
  },
  bubble: {
    requiredColumns: 3,
    description:
      "Select 2 value columns for x and y axes, and one for bubble size",
  },
  scatter: {
    requiredColumns: 3,
    description: "Select two value columns and one category column",
  },
  area: {
    requiredColumns: 2,
    description:
      "Select one category and one value column (area version of line chart)",
  },
}

const ChartColumnSelector = ({
  onColumnsSelected,
  isUploadComplete,
  selectedChart,
}) => {
  const [columns, setColumns] = useState([])
  const [selectedColumns, setSelectedColumns] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isUploadComplete) {
      const fetchColumns = async () => {
        try {
          const response = await axios.get(`${API_BASE}/get-columns/`)
          setColumns(response.data.columns)
        } catch (err) {
          console.error(err)
          setError("Failed to fetch columns. Please upload a file first.")
        }
      }
      fetchColumns()
    } else {
      setColumns([])
      setSelectedColumns([])
    }
  }, [isUploadComplete])

  useEffect(() => {
    setSelectedColumns([])
    setError(null)
  }, [selectedChart])

  const handleColumnSelection = (column) => {
    if (!isUploadComplete) return

    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== column))
    } else {
      setSelectedColumns([...selectedColumns, column])
    }
  }

  const handleConfirmSelection = () => {
    const requiredColumns =
      chartRequirements[selectedChart]?.requiredColumns || 0

    if (selectedColumns.length !== requiredColumns) {
      setError(`Please select exactly ${requiredColumns} columns.`)
      return
    }

    setError(null)
    onColumnsSelected(selectedColumns)
  }

  return (
    <div className={`w-full p-2 ${!isUploadComplete ? "opacity-50" : ""}`}>
      <h3 className="text-lg font-bold mb-2">
        Select Columns for {selectedChart} chart
      </h3>
      <p className="flex items-center gap-3 text-sm font-medium bg-bg-success text-white p-5 rounded mb-4">
        <BadgeCheck />
        {chartRequirements[selectedChart]?.description}
      </p>

      <div className="flex flex-wrap gap-2 max-h-[400px] overflow-y-auto px-3 py-5 border border-border rounded-lg">
        {columns.map((column) => (
          <button
            key={column}
            className={`px-3 py-2 border text-sm font-medium uppercase cursor-pointer transition ${selectedColumns.includes(column)
              ? "bg-[#111] text-white"
              : "bg-white text-black"
              }`}
            onClick={() => handleColumnSelection(column)}
            disabled={!isUploadComplete}
          >
            {column}
          </button>
        ))}
      </div>

      <button
        className="bg-[#111] border border-border rounded-lg cursor-pointer font-medium hover:underline mt-5 p-2"
        onClick={handleConfirmSelection}
        disabled={!isUploadComplete}
      >
        Confirm Selection
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  )
}

export default ChartColumnSelector
