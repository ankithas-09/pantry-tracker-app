import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "animate.css";

const darkColors = {
  primary: "#ff6f61",  // Coral shade
  secondary: "#f48fb1",
  background: "#121212",
  textPrimary: "#ffffff",
  textSecondary: "#b0b0b0",
  border: "#333333",
  shadow: "rgba(0, 0, 0, 0.6)",  // Slightly stronger shadow
};

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery(""); 
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",  // Center the form
        padding: "16px",
        borderRadius: "12px",
        backgroundColor: darkColors.background,
        boxShadow: `0 8px 16px ${darkColors.shadow}`,  // Enhanced shadow
        transition: "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",  // Smooth transitions
        display: "flex",
        flexDirection: "column",  // Ensure vertical stacking
        alignItems: "center",  // Center the content
      }}
      className="animate__animated animate__fadeIn"
    >
      <TextField
        type="text"
        label="Search items..."
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleInputChange}
        InputProps={{
          style: {
            color: darkColors.textPrimary,
            backgroundColor: "#1e1e1e",
            borderRadius: "8px",
          },
        }}
        InputLabelProps={{
          style: {
            color: darkColors.textSecondary,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: darkColors.border,
              borderRadius: "8px",
              boxShadow: `0 4px 8px ${darkColors.shadow}`,
              transition: "box-shadow 0.3s ease-in-out",
            },
            "&:hover fieldset": {
              borderColor: darkColors.primary,
              boxShadow: `0 6px 12px ${darkColors.shadow}`,
            },
            "&.Mui-focused fieldset": {
              borderColor: darkColors.primary,
              boxShadow: `0 6px 12px ${darkColors.shadow}`,
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          marginTop: "16px",  // Space between input and button
          backgroundColor: darkColors.primary,
          boxShadow: `0 6px 12px ${darkColors.shadow}`,
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: darkColors.secondary,
            boxShadow: `0 8px 16px ${darkColors.shadow}`,
          },
          transition: "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        }}
        className="animate__animated animate__pulse"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
