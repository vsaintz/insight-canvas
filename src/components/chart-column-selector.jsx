import { useState, useEffect } from "react"
import axios from "axios"

import { API_BASE } from "@/config"

const chartRequirements = {
  line: {
    requiredColumns: 2,
    description: "Select 1 category and 1 value column.",
  },
  bar: {
    requiredColumns: 2,
    description: "Select 1 category and 1 value column.",
  },
  horizontalBar: {
    requiredColumns: 2,
    description: "Select 1 category and 1 value column (horizontal).",
  },
  radar: {
    requiredColumns: 2,
    description: "Select multiple categories and values for each.",
  },
  donut: {
    requiredColumns: 2,
    description: "Select 1 category and 1 value column.",
  },
  pie: {
    requiredColumns: 2,
    description: "Select 1 category and 1 value column.",
  },
  polarArea: {
    requiredColumns: 2,
    description: "Select 1 category and 1 value column.",
  },
  bubble: {
    requiredColumns: 3,
    description:
      "Select 2 value columns for x and y axes, and 1 for bubble size.",
  },
  scatter: {
    requiredColumns: 3,
    description: "Select 2 value columns and 1 category column.",
  },
  area: {
    requiredColumns: 2,
    description:
      "Select 1 category and 1 value column (area version of line chart).",
  },
};

const ChartColumnSelector = ({
  onColumnsSelected,
  isUploadComplete,
  selectedChart,
}) => {
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isUploadComplete) {
      const fetchColumns = async () => {
        try {
          const response = await axios.get(`${API_BASE}/get-columns/`);
          setColumns(response.data.columns);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch columns. Please upload a file first.");
        }
      };
      fetchColumns();
    } else {
      setColumns([]);
      setSelectedColumns([]);
    }
  }, [isUploadComplete]);

  useEffect(() => {
    setSelectedColumns([]);
    setError(null);
  }, [selectedChart]);

  const handleColumnSelection = (column) => {
    if (!isUploadComplete) return;

    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter((col) => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleConfirmSelection = () => {
    const requiredColumns =
      chartRequirements[selectedChart]?.requiredColumns || 0;

    if (selectedColumns.length !== requiredColumns) {
      setError(`Please select exactly ${requiredColumns} columns.`);
      return;
    }

    setError(null);
    onColumnsSelected(selectedColumns);
  };

  return (
    <div className={`w-full ${!isUploadComplete ? "opacity-50" : ""}`}>
      <h3 className="text-lg font-bold mb-2">
        Select Columns for {selectedChart.charAt(0).toUpperCase() + selectedChart.slice(1)} Chart
      </h3>
      <p className="text-sm bg-green-600 text-white p-2 rounded mb-4">
        {chartRequirements[selectedChart]?.description}
      </p>

      <div className="flex flex-wrap gap-2 max-h-[400px] overflow-y-auto p-2 border border-gray-300 rounded-lg">
        {columns.map((column) => (
          <button
            key={column}
            className={`px-3 py-2 border rounded text-sm cursor-pointer transition ${selectedColumns.includes(column)
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white border-blue-500 text-blue-600 hover:bg-blue-100"
              }`}
            onClick={() => handleColumnSelection(column)}
            disabled={!isUploadComplete}
          >
            {column}
          </button>
        ))}
      </div>

      <button
        className="mt-4 underline text-blue-600 cursor-pointer"
        onClick={handleConfirmSelection}
        disabled={!isUploadComplete}
      >
        Confirm Selection
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default ChartColumnSelector
