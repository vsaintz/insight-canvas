import React, { useState, useEffect } from "react";
import axios from "axios";
import bar_chart_icon from "../assets/icons/bar_chart.svg";
import pie_chart_icon from "../assets/icons/pie_chart.svg";
import scatter_plot_icon from "../assets/icons/scatter_plot.svg";
import line_chart_icon from "../assets/icons/line_chart.svg";

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

const ChartControlPanel = ({
  onSelectChart,
  onColumnsSelected,
  isUploadComplete,
}) => {
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState(null);

  useEffect(() => {
    if (isUploadComplete) {
      const fetchColumns = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/get-columns/",
          );
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
      setChartType(null);
    }
  }, [isUploadComplete]);

  const handleChartSelection = (type) => {
    if (isUploadComplete) {
      setChartType(type);
      setSelectedColumns([]);
      setError(null);
      onSelectChart(type);
    }
  };

  const handleColumnSelection = (column) => {
    if (isUploadComplete) {
      if (selectedColumns.includes(column)) {
        setSelectedColumns(selectedColumns.filter((col) => col !== column));
      } else {
        setSelectedColumns([...selectedColumns, column]);
      }
    }
  };

  const handleConfirmSelection = () => {
    if (isUploadComplete) {
      const requiredColumns =
        chartRequirements[chartType]?.requiredColumns || 0;

      if (selectedColumns.length !== requiredColumns) {
        setError(`Please select exactly ${requiredColumns} columns.`);
        return;
      }

      setError(null);
      onColumnsSelected(selectedColumns);
    }
  };

  const chartTypes = [
    { type: "bar", icon: bar_chart_icon },
    { type: "pie", icon: pie_chart_icon },
    { type: "scatter", icon: scatter_plot_icon },
    { type: "line", icon: line_chart_icon },
  ];

  return (
    <div className={`w-full ${!isUploadComplete ? "disabled" : ""}`}>
      <h1 className="text-2xl">Charts</h1>

      <div className="flex gap-5 my-5">
        {chartTypes.map(({ type, icon }) => (
          <button
            key={type}
            onClick={() => handleChartSelection(type)}
            className="w-14 h-12 border-0 bg-transparent"
            disabled={!isUploadComplete}
          >
            <img src={icon} className="w-full" />
          </button>
        ))}
      </div>

      {chartType && (
        <div className="w-full p-1.5 rounded-3xl shadow-2xl">
          <h3 className="text-base">
            Select Columns for{" "}
            {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
          </h3>
          <p className="text-[0.8rem] bg-[#71BC78] text-white p-1.5 rounded-b-sm my-1.5">
            {chartRequirements[chartType]?.description}
          </p>

          <div className="flex flex-wrap gap-2 max-h-[900px] overflow-y-auto p-2 border border-gray-300 rounded-lg scrollbar-hide">
            {columns.map((column) => (
              <button
                key={column}
                className={`px-2 py-2 border border-blue-500 rounded bg-blue-500 text-white text-base cursor-pointer transition ${selectedColumns.includes(column) ? "bg-blue-700" : "hover:bg-blue-700"}`}
                onClick={() => handleColumnSelection(column)}
                disabled={!isUploadComplete}
              >
                {column}
              </button>
            ))}
          </div>

          <button
            className="mt-12 border-none bg-transparent underline cursor-pointer"
            onClick={handleConfirmSelection}
            disabled={!isUploadComplete}
          >
            Confirm Selection
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ChartControlPanel;
