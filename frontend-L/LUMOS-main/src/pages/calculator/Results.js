"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material"
import { ArrowBack, Download, Print } from "@mui/icons-material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

function Results() {
  const { type } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [results, setResults] = useState(null)
  const resultsRef = useRef(null)

  useEffect(() => {
    // Get data from session storage
    const location = sessionStorage.getItem("userLocation")
    const monthlyBill = sessionStorage.getItem("monthlyBill")

    if (!location || !monthlyBill) {
      navigate(`/calculator/${type}`)
      return
    }

    // Simulate calculating results from backend
    const calculateResults = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const billAmount = Number.parseFloat(monthlyBill)

        // Mock calculation results
        const panelsRequired = Math.round(billAmount / 15)
        const installationCost = panelsRequired * 500
        const yearlySavings = billAmount * 12 * 0.9 // 90% savings
        const carbonReduction = panelsRequired * 0.5 // tons per year
        const breakEvenYears = installationCost / yearlySavings

        setResults({
          panelsRequired,
          installationCost,
          yearlySavings,
          carbonReduction,
          breakEvenYears,
          monthlyBill: billAmount,
          location,
          type,
        })
      } catch (err) {
        setError("Failed to calculate results. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    calculateResults()
  }, [navigate, type])

  const handleExportPDF = () => {
    if (!resultsRef.current) return

    html2canvas(resultsRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save("lumos-solar-results.pdf")
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const savingsData = [
    { name: "Year 1", savings: results?.yearlySavings || 0 },
    { name: "Year 5", savings: (results?.yearlySavings || 0) * 5 },
    { name: "Year 10", savings: (results?.yearlySavings || 0) * 10 },
    { name: "Year 20", savings: (results?.yearlySavings || 0) * 20 },
  ]

  const costBreakdownData = [
    { name: "Installation", value: results?.installationCost || 0 },
    { name: "Maintenance (20yr)", value: (results?.installationCost || 0) * 0.2 },
  ]

  const COLORS = ["#000000", "#777777"]

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
          Your Solar Energy Results
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={4}>
          Here's what we've calculated for your {type} solar setup
        </Typography>

        <Stepper activeStep={2} alternativeLabel sx={{ mb: 4 }}>
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

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box ref={resultsRef}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">Location: {results?.location}</Typography>
                        <Typography variant="body1">Monthly Bill: ${results?.monthlyBill.toFixed(2)}</Typography>
                        <Typography variant="body1">
                          System Type: {results?.type.charAt(0).toUpperCase() + results?.type.slice(1)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1" fontWeight="bold">
                          Panels Required: {results?.panelsRequired}
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" color="primary">
                          Yearly Savings: ${results?.yearlySavings.toFixed(2)}
                        </Typography>
                        <Typography variant="body1">
                          Break-even Point: {results?.breakEvenYears.toFixed(1)} years
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Installation Cost
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                      ${results?.installationCost.toLocaleString()}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Cost Breakdown
                    </Typography>
                    <Box sx={{ height: 200 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={costBreakdownData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {costBreakdownData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Carbon Emission Reduction
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                      {results?.carbonReduction.toFixed(1)} tons/year
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Equivalent to planting {Math.round(results?.carbonReduction * 40)} trees
                    </Typography>
                    <Box sx={{ mt: 2, display: "flex", alignItems: "flex-end", height: 150 }}>
                      {[...Array(5)].map((_, i) => (
                        <Box
                          key={i}
                          sx={{
                            width: "20%",
                            height: `${Math.min(100, (i + 1) * 20)}%`,
                            bgcolor: "black",
                            mx: 0.5,
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4,
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Projected Savings Over Time
                    </Typography>
                    <Box sx={{ height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={savingsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                          <Legend />
                          <Bar dataKey="savings" fill="#000000" name="Cumulative Savings" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<ArrowBack />}
                onClick={() => navigate(`/calculator/${type}/bill`)}
              >
                Back
              </Button>
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<Download />}
                  onClick={handleExportPDF}
                  sx={{ mr: 2 }}
                >
                  Export PDF
                </Button>
                <Button variant="outlined" color="primary" size="large" startIcon={<Print />} onClick={handlePrint}>
                  Print
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default Results
