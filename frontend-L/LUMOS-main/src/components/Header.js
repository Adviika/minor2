"use client"

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { Link } from "react-router-dom"
import { WbSunny } from "@mui/icons-material"

function Header({ user, onLogout }) {
  return (
    <AppBar position="static" color="secondary" elevation={1}>
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <WbSunny sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              fontWeight: "bold",
            }}
          >
            LUMOS
          </Typography>
        </Box>
        {user ? (
          <>
            <Button component={Link} to="/dashboard" color="inherit" sx={{ mx: 1 }}>
              Dashboard
            </Button>
            <Button color="primary" variant="outlined" onClick={onLogout} sx={{ ml: 1 }}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button component={Link} to="/login" color="inherit" sx={{ mx: 1 }}>
              Login
            </Button>
            <Button component={Link} to="/register" color="primary" variant="contained" sx={{ ml: 1 }}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
