import { useState } from "react"

import Sidebar from "@/components/layout/sidebar"
import FileUpload from "@/components/file-upload"
import ChartDisplay from "@/components/chart-display"
import ChartColumnSelector from "@/components/chart-column-selector"

export default function Dashboard() {
    const [isUploadComplete, setIsUploadComplete] = useState(false)
    const [selectedChart, setSelectedChart] = useState(null)
    const [selectedColumns, setSelectedColumns] = useState([])

    const handleUploadSuccess = () => {
        setIsUploadComplete(true)
        setSelectedColumns([])
        setSelectedChart(null)
    }

    const handleChartSelection = (chartType) => {
        setSelectedChart(chartType)
        setSelectedColumns([])
    }

    const handleColumnsSelected = (columns) => {
        setSelectedColumns(columns)
    }

    return (
        <main className="flex min-h-screen">
            <div>
                <Sidebar
                    onSelectChart={handleChartSelection}
                    selectedChart={selectedChart}
                />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center">
                {!isUploadComplete ? (
                    <FileUpload onUploadSuccess={handleUploadSuccess} />
                ) : selectedChart && selectedColumns.length > 0 ? (
                    <ChartDisplay
                        chartType={selectedChart}
                        selectedColumns={selectedColumns}
                    />
                ) : !selectedChart ? (
                    <p className="text-center text-gray-400">
                        Select chart & columns to display the chart.
                    </p>
                ) : null}
                {isUploadComplete && selectedChart && (
                    <div className="w-full max-w-3xl">
                        <ChartColumnSelector
                            selectedChart={selectedChart}
                            onColumnsSelected={handleColumnsSelected}
                            isUploadComplete={isUploadComplete}
                        />
                    </div>
                )}
            </div>
        </main>
    )
}
