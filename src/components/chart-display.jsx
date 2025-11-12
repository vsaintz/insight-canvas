import { useEffect, useState } from "react"
import { Bar, Pie, Scatter, Line } from "react-chartjs-2"
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
} from "chart.js"
import axios from "axios"
import { API_BASE } from "@/config"
import ClipLoader from "react-spinners/ClipLoader"

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
  ArcElement
)

const ChartDisplay = ({ chartType, selectedColumns }) => {
  const [chartData, setChartData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [grouped, setGrouped] = useState(true)
  const ROW_LIMIT = 10

  const generateDynamicTitle = () => {
    if (chartType === "pie") return `${selectedColumns[1]} Distribution by ${selectedColumns[0]}`
    if (chartType === "bar") return `${selectedColumns[1]} by ${selectedColumns[0]}`
    if (chartType === "scatter") return `${selectedColumns[1]} vs ${selectedColumns[2]}`
    if (chartType === "line") return `${selectedColumns[1]} vs ${selectedColumns[0]}`
    return "Chart Representation"
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${API_BASE}/get-processed-data/`, {
          selected_columns: selectedColumns,
        })
        const { processed_data } = response.data

        if (processed_data.length > ROW_LIMIT) setGrouped(true)
        else setGrouped(false)

        setChartData(processed_data)
      } catch (err) {
        setError("Failed to fetch chart data. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [chartType, selectedColumns])

  const grayPalette = ["#ccc", "#999", "#777", "#555", "#aaa", "#888", "#666", "#444", "#bbb"]

  const processData = () => {
    if (!chartData) return null

    if (chartType === "pie") {
      const labels = grouped
        ? [...new Set(chartData.map((row) => row[selectedColumns[0]]))]
        : chartData.map((row) => row[selectedColumns[0]])

      const values = grouped
        ? labels.map((label) =>
          chartData
            .filter((row) => row[selectedColumns[0]] === label)
            .reduce((sum, row) => sum + row[selectedColumns[1]], 0)
        )
        : chartData.map((row) => row[selectedColumns[1]])

      const colors = labels.map((_, i) => grayPalette[i % grayPalette.length])

      return {
        labels,
        datasets: [
          {
            label: `${selectedColumns[1]} Distribution`,
            data: values,
            backgroundColor: colors,
            borderColor: "#222",
            borderWidth: 1,
          },
        ],
      }
    }

    if (chartType === "bar") {
      const labels = grouped
        ? [...new Set(chartData.map((row) => row[selectedColumns[0]]))]
        : chartData.map((row) => row[selectedColumns[0]])

      const values = grouped
        ? labels.map((label) =>
          chartData
            .filter((row) => row[selectedColumns[0]] === label)
            .reduce((sum, row) => sum + row[selectedColumns[1]], 0)
        )
        : chartData.map((row) => row[selectedColumns[1]])

      return {
        labels,
        datasets: [
          {
            label: `${selectedColumns[1]} by ${selectedColumns[0]}`,
            data: values,
            backgroundColor: labels.map((_, i) => grayPalette[i % grayPalette.length]),
            borderColor: "#ddd",
            borderWidth: 1,
          },
        ],
      }
    }

    if (chartType === "scatter") {
      const xValues = chartData.map((row) => row[selectedColumns[1]])
      const yValues = chartData.map((row) => row[selectedColumns[2]])

      return {
        datasets: [
          {
            label: "Scatter Data",
            data: xValues.map((x, i) => ({ x, y: yValues[i] })),
            backgroundColor: "#ccc",
            borderColor: "#999",
          },
        ],
      }
    }

    if (chartType === "line") {
      const labels = chartData.map((row) => row[selectedColumns[0]])
      const values = chartData.map((row) => row[selectedColumns[1]])

      return {
        labels,
        datasets: [
          {
            label: `${selectedColumns[1]} over ${selectedColumns[0]}`,
            data: values,
            borderColor: "#ccc",
            backgroundColor: "rgba(200, 200, 200, 0.2)",
            borderWidth: 1.5,
            tension: 0.1,
          },
        ],
      }
    }

    return null
  }

  const darkOptions = {
    plugins: {
      legend: {
        labels: { color: "#ddd" },
      },
      title: {
        display: true,
        text: generateDynamicTitle(),
        color: "#fff",
      },
    },
    scales: {
      x: {
        ticks: { color: "#ccc" },
        grid: { color: "#333" },
        title: { display: true, text: selectedColumns[0], color: "#aaa" },
      },
      y: {
        ticks: { color: "#ccc" },
        grid: { color: "#333" },
        title: { display: true, text: selectedColumns[1], color: "#aaa" },
      },
    },
  }

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <ClipLoader size={50} color={"#ccc"} loading={true} />
        <p style={{ color: "#999" }}>Loading chart data...</p>
      </div>
    )

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
    )

  const data = processData()

  return (
    <div className="w-4/5 text-center p-2.5" style={{ color: "#ccc" }}>
      <div className="mb-5">
        <label>
          <input
            type="checkbox"
            checked={grouped}
            onChange={(e) => setGrouped(e.target.checked)}
          />{" "}
          Group Data
        </label>
      </div>
      {data && (
        <>
          {chartType === "pie" && (
            <div className="w-4xl h-[600px] m-auto p-5 rounded-b-xl">
              <Pie data={data} options={darkOptions} />
            </div>
          )}
          {chartType === "bar" && (
            <div className="max-w-[90%] m-auto">
              <Bar data={data} options={darkOptions} />
            </div>
          )}
          {chartType === "scatter" && (
            <div className="max-w-[90%] m-auto">
              <Scatter data={data} options={darkOptions} />
            </div>
          )}
          {chartType === "line" && (
            <div className="max-w-[90%] m-auto">
              <Line data={data} options={darkOptions} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ChartDisplay
