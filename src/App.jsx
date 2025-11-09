import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"

import Index from "@/components/index"
import Navigation from "@/components/layout/navigation"
import Dashboard from "@/components/layout/dashboard"

function Layout() {
  const location = useLocation()
  const hideNav = location.pathname === "/dashboard"

  return (
    <>
      {!hideNav && <Navigation />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}
