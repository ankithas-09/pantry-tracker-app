import { Box, Typography, Container, Paper, Button } from "@mui/material";
import "animate.css";
import Link from "next/link";

const About = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      bgcolor: "#121212",
      color: "#fff",
      p: 3,
      backgroundImage: 'url("public/pantry.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      position: "relative",
      "::after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: -1,
      },
    }}
  >
    <Container maxWidth="lg">
      <Paper
        elevation={12}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: "#282828",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          animation: "fadeIn 1.2s ease-in-out",
          boxShadow: "0 0 30px rgba(0, 255, 255, 0.4)",
        }}
        className="animate__animated animate__fadeIn"
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            textAlign: "center",
            mb: 4,
            fontSize: "2.5rem",
            color: "#e0e0e0",
            fontWeight: 700,
            textShadow: "1px 1px 5px rgba(0, 255, 255, 0.4)",
          }}
          className="animate__animated animate__fadeIn"
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            mb: 4,
            color: "#e0e0e0",
          }}
          className="animate__animated animate__fadeIn animate__delay-1s"
        >
          Greetings from our app! Our goal is to provide outstanding pantry 
          management services.  Using our app, you can effectively manage your
          inventory, keep an eye on the things in your pantry, and ensure that
          you never run out of necessities. We appreciate your choice and hope 
          you find it to be very pleasant and helpful!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            display: "block",
            mx: "auto",
            fontSize: "1rem",
            p: "12px 24px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
            bgcolor: "#81d4fa",
            "&:hover": {
              bgcolor: "#4fc3f7",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5)",
            },
            textAlign: "center",
          }}
          className="animate__animated animate__pulse"
          component={Link}
          href="https://ankithasuresh.com/"
        >
          Learn About Me
        </Button>
      </Paper>
    </Container>
  </Box>
);

export default About;
