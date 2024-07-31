import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import "animate.css";

const darkColors = {
  primary: "#FF7F50", // Coral shade
  secondary: "#FF6347", // Tomato shade
  backgroundDefault: "#121212",
  backgroundPaper: "#1e1e1e",
  textPrimary: "#ffffff",
  textSecondary: "#b0b0b0",
  divider: "#333333",
  shadow: "rgba(0, 0, 0, 0.5)",
};

const ItemList = ({ pantry, removeItem, handleOpen }) => {
  const [animatedItems, setAnimatedItems] = useState([]);
  const observer = useRef(null);

  useEffect(() => {
    // Intersection Observer setup
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const itemId = entry.target.getAttribute("data-id");
          setAnimatedItems((prev) => [...prev, itemId]);
          observer.current.unobserve(entry.target);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
    });

    const items = document.querySelectorAll(".item-box");
    items.forEach((item) => observer.current.observe(item));

    return () => {
      items.forEach((item) => observer.current.unobserve(item));
    };
  }, [pantry]);

  return (
    <Box
      border={`1px solid ${darkColors.divider}`}
      bgcolor={darkColors.backgroundDefault}
      color={darkColors.textPrimary}
      boxShadow={`0 6px 12px ${darkColors.shadow}`}
      padding={3}
      borderRadius={2}
      width="100%"
      maxWidth="900px"
      margin="0 auto"
      className="animate__animated animate__fadeIn"
    >
      <Box
        width="100%"
        height="100px"
        bgcolor={darkColors.primary}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={2}
        borderRadius={2}
        boxShadow={`0 4px 8px ${darkColors.shadow}`}
        marginBottom={3}
        className="animate__animated animate__bounceIn"
      >
        <Typography
          variant="h4"
          color={darkColors.textPrimary}
          textAlign="center"
          sx={{ textShadow: `0 2px 4px ${darkColors.shadow}` }}
          className="animate__animated animate__pulse"
        >
          My Pantry
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleOpen}
          sx={{
            boxShadow: `0 4px 8px ${darkColors.shadow}`,
            textTransform: "none",
            transition: "background-color 0.3s, box-shadow 0.3s",
            "&:hover": {
              backgroundColor: darkColors.secondary,
              boxShadow: `0 6px 12px ${darkColors.shadow}`,
            },
          }}
          className="animate__animated animate__rubberBand"
        >
          Add Item
        </Button>
      </Box>
      <Stack
        bgcolor={darkColors.backgroundDefault}
        width="100%"
        height="300px"
        spacing={2}
        sx={{ overflowY: "auto", padding: 2 }}
      >
        {pantry.map(({ name, count, imageUrl }) => (
          <Box
            key={name}
            data-id={name}
            className={`item-box ${animatedItems.includes(name) ? "animate__animated animate__fadeInUp" : ""}`}
            width="100%"
            height="150px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor={darkColors.backgroundPaper}
            color={darkColors.textPrimary}
            padding={2}
            border={`1px solid ${darkColors.divider}`}
            marginBottom={2}
            borderRadius={1}
            boxShadow={`0 4px 8px ${darkColors.shadow}`}
            sx={{
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: `0 6px 12px ${darkColors.shadow}`,
              },
            }}
          >
            <Box
              component="img"
              src={imageUrl}
              alt={name}
              sx={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 1,
                border: `1px solid ${darkColors.divider}`,
                boxShadow: `0 2px 4px ${darkColors.shadow}`,
              }}
            />
            <Box flex={1} textAlign="center">
              <Typography
                variant="h6"
                color={darkColors.textPrimary}
                sx={{ textShadow: `0 1px 2px ${darkColors.shadow}` }}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography
                variant="subtitle1"
                color={darkColors.textSecondary}
                sx={{ textShadow: `0 1px 2px ${darkColors.shadow}` }}
              >
                Quantity: {count}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                backgroundColor: darkColors.secondary,
                boxShadow: `0 2px 4px ${darkColors.shadow}`,
                "&:hover": {
                  backgroundColor: darkColors.primary,
                  boxShadow: `0 4px 8px ${darkColors.shadow}`,
                },
              }}
              onClick={() => removeItem(name)}
              className="animate__animated animate__flash"
            >
              Remove
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ItemList;
