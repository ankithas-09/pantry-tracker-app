import { Container, Typography, Box, Link } from "@mui/material";
import { metadata } from "../layout";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#121212",
        color: "#ffffff",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ mb: 1 }}>
          © 2024 All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
