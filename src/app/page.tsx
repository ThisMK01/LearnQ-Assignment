"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useName } from "../Context/NameContext";
import {
  Button,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Box,
  Paper,
  Stack,
  Fade,
  Grow,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SpeedIcon from "@mui/icons-material/Speed";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

export default function DifficultySelection() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("Any");
  const { name } = useName();
  const [animate, setAnimate] = useState(false);

  // Animation trigger
  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleNext = () => {
    sessionStorage.setItem("difficulty", selected);

    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    router.push("/rules");
  };

  // Difficulty level data with icons and descriptions
  const difficulties = [
    {
      name: "Easy",
      icon: <SchoolIcon fontSize="large" sx={{ color: "#4caf50" }} />,
      description:
        "Perfect for beginners. Basic questions to build confidence.",
    },
    {
      name: "Medium",
      icon: <SpeedIcon fontSize="large" sx={{ color: "#ff9800" }} />,
      description: "Balanced challenge. Good for regular practice.",
    },
    {
      name: "Hard",
      icon: <EmojiEventsIcon fontSize="large" sx={{ color: "#f44336" }} />,
      description: "Advanced questions. Test your expertise.",
    },
    {
      name: "Any",
      icon: <AllInclusiveIcon fontSize="large" sx={{ color: "#1976d2" }} />,
      description: "Mixed difficulty. Surprise yourself!",
    },
  ];

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 4, md: 6 },
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={animate} timeout={500}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            width: "100%",
            borderRadius: 4,
            border: "1px solid rgba(0, 0, 0, 0.08)",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Stack spacing={5}>
            <Box textAlign="center">
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  background: "linear-gradient(45deg, #1976d2, #9c27b0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.5px",
                  mb: 1,
                }}
              >
                {name ? `${name}, ` : ""}Select Your Difficulty
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                Choose a difficulty level to begin your quiz journey.
              </Typography>

              <Divider sx={{ mt: 3, opacity: 0.6, width: "70%", mx: "auto" }} />
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              {difficulties.map((level, i) => (
                <Grow in={animate} timeout={500 + i * 150} key={level.name}>
                  <Card
                    elevation={selected === level.name ? 4 : 1}
                    sx={{
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      transform:
                        selected === level.name ? "translateY(-5px)" : "none",
                      border:
                        selected === level.name
                          ? "3px solid #1976d2"
                          : "3px solid #9e9e9e",
                      height: "100%",
                      "&:hover": {
                        borderColor: "#1976d2",
                        boxShadow: "0 5px 15px rgba(25, 118, 210, 0.15)",
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <CardActionArea
                      onClick={() => setSelected(level.name)}
                      sx={{ height: "100%", p: 1 }}
                    >
                      <CardContent sx={{ height: "100%" }}>
                        <Stack spacing={2}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                              }}
                            >
                              {level.icon}
                              <Typography
                                variant="h5"
                                sx={{
                                  fontWeight: 700,
                                  color:
                                    selected === level.name
                                      ? "#1976d2"
                                      : "text.primary",
                                }}
                              >
                                {level.name}
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                width: 30,
                                height: 30,
                                borderRadius: "50%",
                                border:
                                  selected === level.name
                                    ? "none"
                                    : "2px solid rgba(0, 0, 0, 0.12)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor:
                                  selected === level.name
                                    ? "#1976d2"
                                    : "transparent",
                                color: "#fff",
                                transition: "all 0.2s ease",
                              }}
                            >
                              {selected === level.name && <CheckCircleIcon />}
                            </Box>
                          </Box>

                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ fontWeight: 400 }}
                          >
                            {level.description}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grow>
              ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderRadius: "50px",
                  px: 5,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  background: "linear-gradient(45deg, #1976d2, #1565c0)",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #1565c0, #0d47a1)",
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                Start Quiz
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Fade>
    </Container>
  );
}
