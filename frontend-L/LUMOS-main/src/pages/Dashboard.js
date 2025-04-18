"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Typography, Grid, Card, CardContent, CardActionArea, Box } from "@mui/material"
import { Home, Business, Factory } from "@mui/icons-material"

function Dashboard({ user }) {
  const navigate = useNavigate()
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimate(true)
  }, [])

  const handleCardClick = (type) => {
    navigate(`/calculator/${type.toLowerCase()}`)
  }

  const categories = [
    {
      title: "Residential",
      icon: <Home sx={{ fontSize: 60 }} />,
      description: "Optimize solar energy for your home",
      type: "residential",
    },
    {
      title: "Corporate",
      icon: <Business sx={{ fontSize: 60 }} />,
      description: "Solar solutions for your business",
      type: "corporate",
    },
    {
      title: "Industrial",
      icon: <Factory sx={{ fontSize: 60 }} />,
      description: "Large-scale industrial solar systems",
      type: "industrial",
    },
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          animation: "fadeIn 0.8s ease-in-out",
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
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Welcome back, {user?.name}
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ fontStyle: "italic" }}>
          Maximize Your Savings
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {categories.map((category, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={category.type}
            sx={{
              opacity: animate ? 1 : 0,
              transform: animate ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.5s ease ${index * 0.2}s`,
            }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardActionArea
                onClick={() => handleCardClick(category.type)}
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Box
                  sx={{
                    p: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {category.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Dashboard
