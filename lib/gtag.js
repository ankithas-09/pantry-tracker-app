// lib/gtag.js

// Get the GA Measurement ID from environment variables
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

// Log page views to Google Analytics
export const logPageView = (url) => {
  if (window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Log custom events to Google Analytics
export const logEvent = ({ action, category, label, value }) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
