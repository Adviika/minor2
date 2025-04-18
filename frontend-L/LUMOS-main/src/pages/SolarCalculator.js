"use client"

import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Typography, Button, Box, Paper, Stepper, Step, StepLabel } from "@mui/material"
import { ArrowForward } from "@mui/icons-material"

function SolarCalculator() {
  const { type } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to the first step (location input)
    navigate(`/calculator/${type}/location`)
  }, [navigate, type])

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
          Solar Energy Calculator
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={4}>
          Let's optimize your {type} solar energy setup
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

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate(`/calculator/${type}/location`)}
          >
            Get Started
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default SolarCalculator
