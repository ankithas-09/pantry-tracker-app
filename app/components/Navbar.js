import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { metadata } from "../layout";

const Navbar = () => (
  <Box
    width="200px" // Fixed width for the navbar
    height="23vh" // Height of the navbar
    display="flex"
    position="fixed"
    top={0}
    left={0}
    zIndex={1200}
    sx={{ 
      backgroundColor: "rgba(255, 127, 80, 0.8)", // Coral shade
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", 
      backdropFilter: "blur(10px)", 
    }}
  >
    <AppBar
      position="static"
      sx={{
        width: "100%", 
        boxShadow: "none", // Remove the shadow here if needed
        backgroundColor: "rgba(255, 127, 80, 0.8)", // Coral shade
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column", // Stack items vertically
          padding: "10px", // Add padding if needed
          width: "100%",
          height: "100%", // Full height to fill the container
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {metadata.title}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/about">
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;
