import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Scatter, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import ClipLoader from "react-spinners/ClipLoader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const ChartDisplay = ({ chartType, selectedColumns }) => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [grouped, setGrouped] = useState(true); // Toggle for grouped/raw view
  const ROW_LIMIT = 10; // Threshold for grouping

  const generateDynamicTitle = () => {
    if (chartType === "pie") {
      return `${selectedColumns[1]} Distribution by ${selectedColumns[0]}`;
    } else if (chartType === "bar") {
      return `${selectedColumns[1]} by ${selectedColumns[0]}`;
    } else if (chartType === "scatter") {
      return `${selectedColumns[1]} vs ${selectedColumns[2]}`;
    } else if (chartType === "line") {
      return `${selectedColumns[1]} vs ${selectedColumns[0]}`;
    }
    return "Chart Representation";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/get-processed-data/",
          {
            selected_columns: selectedColumns,
          },
        );
        const { processed_data } = response.data;

        if (processed_data.length > ROW_LIMIT) {
          setGrouped(true);
        } else {
          setGrouped(false);
        }

        setChartData(processed_data);
      } catch (err) {
        setError("Failed to fetch chart data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chartType, selectedColumns]);

  const processData = () => {
    if (!chartData) return null;

    const rgbaPalette = ["rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)"];

    if (chartType === "pie") {
      const labels = grouped
        ? [...new Set(chartData.map((row) => row[selectedColumns[0]]))]
        : chartData.map((row) => row[selectedColumns[0]]);
      const values = grouped
        ? labels.map((label) =>
            chartData
              .filter((row) => row[selectedColumns[0]] === label)
              .reduce((sum, row) => sum + row[selectedColumns[1]], 0),
          )
        : chartData.map((row) => row[selectedColumns[1]]);
      const colors = grouped
        ? labels.map(
            (_, index) => `hsl(${(index * 360) / labels.length}, 70%, 60%)`,
          )
        : labels.map((_, index) => rgbaPalette[index % rgbaPalette.length]);

      return {
        labels,
        datasets: [
          {
            label: `${selectedColumns[1]} Distribution`,
            data: values,
            backgroundColor: colors,
            borderColor: colors.map((color) => color.replace("0.9", "1.0")),
            borderWidth: 1,
          },
        ],
      };
    }

    if (chartType === "bar") {
      const labels = grouped
        ? [...new Set(chartData.map((row) => row[selectedColumns[0]]))]
        : chartData.map((row) => row[selectedColumns[0]]);
      const values = grouped
        ? labels.map((label) =>
            chartData
              .filter((row) => row[selectedColumns[0]] === label)
              .reduce((sum, row) => sum + row[selectedColumns[1]], 0),
          )
        : chartData.map((row) => row[selectedColumns[1]]);

      const colors = grouped
        ? labels.map(
            (_, index) =>
              `hsla(${(index * 360) / labels.length}, 70%, 60%, 0.8)`,
          )
        : labels.map((_, index) => rgbaPalette[index % rgbaPalette.length]);

      return {
        labels,
        datasets: [
          {
            label: `${selectedColumns[1]} by ${selectedColumns[0]}`,
            data: values,
            backgroundColor: colors,
            borderColor: colors.map((color) => color.replace("0.8", "1.0")),
            borderWidth: 1,
          },
        ],
      };
    }

    if (chartType === "scatter") {
      const xValues = chartData.map((row) => row[selectedColumns[1]]);
      const yValues = chartData.map((row) => row[selectedColumns[2]]);
      return {
        datasets: [
          {
            label: "Scatter Data",
            data: xValues.map((x, i) => ({ x, y: yValues[i] })),
            backgroundColor: "rgba(75,192,192,0.6)",
          },
        ],
      };
    }

    if (chartType === "line") {
      const labels = chartData.map((row) => row[selectedColumns[0]]);
      const values = chartData.map((row) => row[selectedColumns[1]]);

      return {
        labels,
        datasets: [
          {
            label: `${selectedColumns[1]} over ${selectedColumns[0]}`,
            data: values,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 1.5,
            tension: 0.1, // For smooth curves
          },
        ],
      };
    }

    return null;
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <ClipLoader size={50} color={"#123abc"} loading={true} />

        <p>Loading chart data...</p>
      </div>
    );

  if (error)
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{ padding: "10px 20px", marginTop: "10px" }}
        >
          Retry
        </button>
      </div>
    );

  const data = processData();

  return (
    <div className="w-4/5 text-center p-2.5">
      <div className="mb-5">
        <label>
          <input
            type="checkbox"
            checked={grouped}
            onChange={(e) => setGrouped(e.target.checked)}
          />
          Group Data
        </label>
      </div>
      {data && (
        <>
          {chartType === "pie" && (
            <div className="w-4xl h-[600px] m-auto p-5 rounded-b-xl">
              <Pie
                data={data}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    title: { display: true, text: generateDynamicTitle() },
                    legend: { position: "top" },
                  },
                }}
              />
            </div>
          )}
          {chartType === "bar" && (
            <div className="max-w-[90%] m-auto">
              <Bar
                data={data}
                options={{
                  plugins: {
                    title: { display: true, text: generateDynamicTitle() },
                    legend: { display: false },
                  },
                  scales: {
                    x: { title: { display: true, text: selectedColumns[0] } },
                    y: { title: { display: true, text: selectedColumns[1] } },
                  },
                }}
              />
            </div>
          )}
          {chartType === "scatter" && (
            <div className="max-w-[90%] m-auto">
              <Scatter
                data={data}
                options={{
                  plugins: {
                    title: { display: true, text: generateDynamicTitle() },
                    legend: { display: false },
                  },
                  scales: {
                    x: { title: { display: true, text: selectedColumns[1] } },
                    y: { title: { display: true, text: selectedColumns[2] } },
                  },
                }}
              />
            </div>
          )}
          {chartType === "line" && (
            <div className="max-w-[90%] m-auto">
              <Line
                data={data}
                options={{
                  plugins: {
                    title: { display: true, text: generateDynamicTitle() },
                    legend: { display: false, position: "top" },
                  },
                  scales: {
                    x: { title: { display: true, text: selectedColumns[0] } },
                    y: { title: { display: true, text: selectedColumns[1] } },
                  },
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChartDisplay;
