import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navigation from "@/components/layout/navigation"
import Index from "@/index"
import About from "@/components/layout/about"
import Contact from "@/components/layout/contact"

import DashBoard from "@/components/layout/dashboard"

const App = () => {
  const [currentStep, setCurrentStep] = useState("index")

  const handleGetStarted = () => {
    setCurrentStep("workflow")
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
              <div className="w-full h-full">
                <DashBoard />
              </div>
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
