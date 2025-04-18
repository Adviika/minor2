"use client"
import { motion } from "framer-motion"
import "./App.css"
import Lottie from "lottie-react"
import solarAnimation from "../src/solar-animation.json"
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

// Import components and pages
import Header from "./components/Header"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import SolarCalculator from "./pages/SolarCalculator"
import LocationInput from "./pages/calculator/LocationInput"
import ElectricityBill from "./pages/calculator/ElectricityBill"
import Results from "./pages/calculator/Results"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"



// Create a theme with Montserrat font
const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#ffffff",
    },
  },
  shape: {
    borderRadius: 16, // 2xl rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-2px)",
            transition: "all 0.3s ease",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-5px)",
            transition: "all 0.3s ease",
          },
        },
      },
    },
  },
})

// Main App component
function App() {
  const [user, setUser] = useState(null)
  const [showLandingPage, setShowLandingPage] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (token) {
      // Verify token with backend
      fetch("http://localhost:5000/api/auth/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw new Error("Token verification failed")
        })
        .then((data) => {
          setUser(data.user)
        })
        .catch((error) => {
          console.error("Error verifying token:", error)
          localStorage.removeItem("token")
        })
    }
  }, [])

  const handleLogin = (userData, token) => {
    setUser(userData)
    localStorage.setItem("token", token)
    setShowLandingPage(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("token")
    setShowLandingPage(true)
  }

  // Animation variants for the benefit cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 300 },
    },
  }

  // Staggered animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Landing page component
  const LandingPage = () => {
    const navigate = useNavigate()

    return (
      <div className="app">
        <header className="header">
          <div className="logo-container">{/* Logo would go here */}</div>
          <div className="auth-buttons">
            <button className="register-btn" onClick={() => navigate("/register")}>
              Register
            </button>
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </header>

        <main>
          <section className="hero-section">
            <div className="hero-content">
              <motion.h1
                className="main-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                LUMOS
              </motion.h1>
              <motion.h2
                className="subtitle"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                AI Powered Solar Energy Optimizer
              </motion.h2>
              <motion.p
                className="description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Lumos is a platform designed to make solar energy adoption easier and smarter. With rising energy costs
                and a growing focus on sustainability, many people are considering solar power—but they often face
                challenges in understanding how much they can save, how efficient solar panels would be for their
                location, or how to benefit from government incentives.
              </motion.p>
            </div>
            <div
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden", // just in case the animation overflows
              }}
            >
              <Lottie
                animationData={solarAnimation}
                loop={true}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </section>

          <motion.section
            className="benefits-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="benefit-card" variants={cardVariants} whileHover="hover">
              <div className="benefit-icon">💰</div>
              <h3 className="benefit-title">Financial Benefits</h3>
              <p className="benefit-description">
                Switching to solar with Lumos can cut your electricity bills by up to 70% annually.
              </p>
            </motion.div>

            <motion.div className="benefit-card" variants={cardVariants} whileHover="hover">
              <div className="benefit-icon">🌍</div>
              <h3 className="benefit-title">Carbon Emission Reductions</h3>
              <p className="benefit-description">
                Using Lumos-powered solar solutions can reduce your carbon footprint by over 1 ton CO<sub>2</sub> per
                year — that's like planting 25 trees annually!
              </p>
            </motion.div>

            <motion.div className="benefit-card" variants={cardVariants} whileHover="hover">
              <div className="benefit-icon">💰</div>
              <h3 className="benefit-title">Tax Savings in India</h3>
              <p className="benefit-description">
                Under Section 80-IBA and 80-IA, solar adopters in India can get up to 40% depreciation benefits and tax
                deductions on solar investments.
              </p>
            </motion.div>

            <motion.div className="benefit-card" variants={cardVariants} whileHover="hover">
              <div className="benefit-icon">🏭</div>
              <h3 className="benefit-title">Industrial Gains</h3>
              <p className="benefit-description">
                Industries using AI-optimized solar setups can save lakhs per year on peak demand charges and reduce
                grid dependency significantly.
              </p>
            </motion.div>

            <motion.div className="benefit-card" variants={cardVariants} whileHover="hover">
              <div className="benefit-icon">☀️</div>
              <h3 className="benefit-title">Government Incentives</h3>
              <p className="benefit-description">
                Lumos helps you tap into MNRE-approved subsidies — up to ₹78,000 for a 3kW system!
              </p>
            </motion.div>
          </motion.section>
        </main>

        <footer className="footer">
          <div className="footer-logo">
            <p>Lumos - AI Powered Solar Energy Optimizer</p>
          </div>
          <div className="footer-credits">
            <p>Developed by:</p>
            <p>Shivam Saxena</p>
            <p>Astha Tiwari</p>
            <p>Advika Bhardwaj</p>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {user && <Header user={user} onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/calculator/:type" element={user ? <SolarCalculator /> : <Navigate to="/login" />} />
          <Route path="/calculator/:type/location" element={user ? <LocationInput /> : <Navigate to="/login" />} />
          <Route path="/calculator/:type/bill" element={user ? <ElectricityBill /> : <Navigate to="/login" />} />
          <Route path="/calculator/:type/results" element={user ? <Results /> : <Navigate to="/login" />} />
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
