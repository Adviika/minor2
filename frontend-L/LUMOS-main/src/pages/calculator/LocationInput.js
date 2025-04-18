"use client"

import { useState } from "react"
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
  Grid,
} from "@mui/material"
import { MyLocation, ArrowForward } from "@mui/icons-material"

function LocationInput() {
  const { type } = useParams()
  const navigate = useNavigate()
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleUseCurrentLocation = () => {
    setLoading(true)
    setError("")

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // In a real app, you would use a reverse geocoding service
            // to get the address from coordinates
            const { latitude, longitude } = position.coords

            // Simulate API call for reverse geocoding
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
            setLoading(false)
          } catch (err) {
            setError("Failed to get your location. Please enter it manually.")
            setLoading(false)
          }
        },
        (err) => {
          setError("Failed to get your location. Please enter it manually.")
          setLoading(false)
        },
      )
    } else {
      setError("Geolocation is not supported by your browser. Please enter your location manually.")
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!location) {
      setError("Please enter your location or use current location")
      return
    }

    setLoading(true)

    try {
      // In a real app, you would send this location to your backend
      // to fetch electricity prices and provider info

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store location in session storage for later use
      sessionStorage.setItem("userLocation", location)

      // Navigate to the next step
      navigate(`/calculator/${type}/bill`)
    } catch (err) {
      setError("Failed to process your location. Please try again.")
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
          Where are you located?
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={4}>
          We'll use this to calculate solar potential in your area
        </Typography>

        <Stepper activeStep={0} alternativeLabel sx={{ mb: 4 }}>
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

        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your address or coordinates"
                variant="outlined"
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<MyLocation />}
                onClick={handleUseCurrentLocation}
                disabled={loading}
                sx={{ mb: 3 }}
              >
                Use Current Location
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForward />}
              disabled={loading || !location}
            >
              {loading ? <CircularProgress size={24} /> : "Next"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default LocationInput
