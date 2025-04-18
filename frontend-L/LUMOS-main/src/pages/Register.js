"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Box, Typography, TextField, Button, Paper, Grid, CircularProgress } from "@mui/material"
import { WbSunny } from "@mui/icons-material"

function Register({ onLogin }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      // Make API call to your Node.js backend
      const response = await fetch("http://localhost:1221/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to register")
      }

      // Call the onLogin function with user data and token
      onLogin(data.user, data.token)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          mb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <WbSunny sx={{ fontSize: 40, mb: 2, color: "primary.main" }} />
            <Typography component="h1" variant="h4" fontWeight="bold">
              Join Lumos Today
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              Create your account to get started
            </Typography>
          </Box>

          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Register"}
            </Button>

            <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
              <Grid item>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="primary" sx={{ "&:hover": { textDecoration: "underline" } }}>
                    Already have an account? Login
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Register
