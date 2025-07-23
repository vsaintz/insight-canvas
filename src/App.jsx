import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import Index from "./components/Index";
import FileUploader from "./components/FileUploader.jsx";
import ChartControlPanel from "./components/ChartControlPanel.jsx";
import ChartDisplay from "./components/ChartDisplay.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";

const App = () => {
  const [currentStep, setCurrentStep] = useState("index"); 
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleGetStarted = () => {
    setCurrentStep("workflow"); // Switch to workflow
  };

  const handleUploadSuccess = () => {
    setIsUploadComplete(true);
    setSelectedColumns([]);
    setSelectedChart(null);
  };

  const handleChartSelection = (chartType) => {
    setSelectedChart(chartType);
  };

  const handleColumnsSelected = (columns) => {
    setSelectedColumns(columns);
  };

  return (
    <Router>
      <Navigation showNav={currentStep === "index"} />

      <Routes>
        <Route
          path="/"
          element={
            currentStep === "index" ? (
              <Index onGetStarted={handleGetStarted} />
            ) : (
              <div className="h-screen flex flex-col">

                <div className="flex flex-grow">
                  {/* Left Section */}
                  <div className="flex justify-center items-center w-[75%] p-10 border-r border-r-gray-300">
                    {!isUploadComplete ? (
                      <FileUploader onUploadSuccess={handleUploadSuccess} />
                    ) : selectedChart && selectedColumns.length > 0 ? (
                      <ChartDisplay
                        chartType={selectedChart}
                        selectedColumns={selectedColumns}
                      />
                    ) : (
                      <p className="text-center text-gray-400">
                        Select chart & columns to display the chart.
                      </p>
                    )}
                  </div>

                  {/* Right Section (Control Panel) */}
                  <div className="flex-1 p-[10px]">
                    <ChartControlPanel
                      onSelectChart={handleChartSelection}
                      onColumnsSelected={handleColumnsSelected}
                      isUploadComplete={isUploadComplete}
                    />
                  </div>
                </div>
              </div>
            )
          }
        />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
