import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import Script from "next/script";

import "./globals.css";
import "animate.css";

export const metadata = {
  title: "Pantry Tracker",
  description: "A pantry app",
  icons: {
    favicon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        {/* Noise overlay for a textured effect */}
        <div className="noise-overlay"></div>

        {/* Google Analytics */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Navbar */}
        <Navbar />

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            marginTop: "30px",
            minHeight: "100vh",
            padding: "10px 15px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
