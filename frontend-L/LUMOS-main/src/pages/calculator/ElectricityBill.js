"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  TextField,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  InputAdornment,
  Card,
  CardContent,
} from "@mui/material"
import { ArrowForward, ArrowBack } from "@mui/icons-material"

function ElectricityBill() {
  const { type } = useParams()
  const navigate = useNavigate()
  const [monthlyBill, setMonthlyBill] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [providerInfo, setProviderInfo] = useState(null)
  const [location, setLocation] = useState("")

  useEffect(() => {
    // Get location from session storage
    const storedLocation = sessionStorage.getItem("userLocation")
    if (!storedLocation) {
      navigate(`/calculator/${type}/location`)
      return
    }

    setLocation(storedLocation)

    // Simulate fetching provider info from backend
    const fetchProviderInfo = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock provider info
        setProviderInfo({
          provider: "SunPower Energy",
          rate: 0.14, // $ per kWh
          averageUsage: 900, // kWh per month
        })
      } catch (err) {
        setError("Failed to fetch electricity provider information. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchProviderInfo()
  }, [navigate, type])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!monthlyBill || isNaN(Number.parseFloat(monthlyBill)) || Number.parseFloat(monthlyBill) <= 0) {
      setError("Please enter a valid monthly bill amount")
      return
    }

    setLoading(true)

    try {
      // In a real app, you would send this to your backend

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store bill amount in session storage for later use
      sessionStorage.setItem("monthlyBill", monthlyBill)

      // Navigate to the results page
      navigate(`/calculator/${type}/results`)
    } catch (err) {
      setError("Failed to process your information. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          animation: "fadeIn 0.5s ease-in-out",
          "@keyframes fadeIn": {
            "0%": {
              opacity: 0,
              transform: "translateY(20px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom textAlign="center" fontWeight="bold">
          Enter Your Monthly Electricity Bill
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={4}>
          This helps us calculate your potential savings
        </Typography>

        <Stepper activeStep={1} alternativeLabel sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Location</StepLabel>
          </Step>
          <Step>
            <StepLabel>Electricity Bill</StepLabel>
          </Step>
          <Step>
            <StepLabel>Results</StepLabel>
          </Step>
        </Stepper>

        {providerInfo && (
          <Card variant="outlined" sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Electricity Provider Information
              </Typography>
              <Typography variant="body1">Location: {location}</Typography>
              <Typography variant="body1">Provider: {providerInfo.provider}</Typography>
              <Typography variant="body1">Rate: ${providerInfo.rate.toFixed(2)} per kWh</Typography>
              <Typography variant="body1">Average Usage in Your Area: {providerInfo.averageUsage} kWh/month</Typography>
            </CardContent>
          </Card>
        )}

        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <TextField
            fullWidth
            label="Monthly Electricity Bill"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(e.target.value)}
            placeholder="Enter your average monthly bill"
            variant="outlined"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            disabled={loading}
            sx={{ mb: 4 }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<ArrowBack />}
              onClick={() => navigate(`/calculator/${type}/location`)}
              disabled={loading}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForward />}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Calculate Results"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default ElectricityBill
