"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Box, Typography, TextField, Button, Paper, Grid, CircularProgress } from "@mui/material"
import { WbSunny } from "@mui/icons-material"

function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Make API call to your Node.js backend
      const response = await fetch("http://localhost:1221/api/auth/login", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to login")
      }

      // Call the onLogin function with user data and token
      onLogin(data.user, data.token)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Failed to login. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
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
              Welcome Back to Lumos
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              Sign in to continue to your account
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>

            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={12} sm={6}>
                <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="primary" sx={{ "&:hover": { textDecoration: "underline" } }}>
                    Forgot Password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} textAlign="right">
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="primary" sx={{ "&:hover": { textDecoration: "underline" } }}>
                    Don't have an account? Register
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

export default Login
