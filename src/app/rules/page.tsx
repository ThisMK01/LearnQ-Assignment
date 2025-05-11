"use client";
import { useRouter } from "next/navigation";
import {
  Button,
  Typography,
  Container,
  Box,
  Paper,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Fade,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import StarIcon from "@mui/icons-material/Star";
import QuizIcon from "@mui/icons-material/Quiz";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

export default function Rules() {
  const router = useRouter();

  const handleNext = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen().then(() => {
        router.push("/quiz");
      });
    } else {
      router.push("/quiz");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Fade in timeout={800}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            border: "1px solid rgba(0, 0, 0, 0.08)",
            backgroundColor: "#ffffff",
            width: "100%",
          }}
        >
          <Stack spacing={4} alignItems="center">
            <Box textAlign="center">
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  background: "linear-gradient(45deg, #1976d2, #9c27b0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.5px",
                }}
              >
                Quiz Rules
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  fontWeight: 400,
                  maxWidth: "600px",
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                Please read the following information before starting the quiz:
              </Typography>
            </Box>

            <Divider sx={{ width: "100%", maxWidth: "600px" }} />

            {/* Rules Section */}
            <Box
              sx={{
                width: "100%",
                maxWidth: "600px",
                px: { xs: 1, sm: 2 },
              }}
            >
              <List sx={{ py: 0 }}>
                <ListItem sx={{ pb: 2 }}>
                  <ListItemIcon>
                    <QuizIcon sx={{ color: "#1976d2" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        The quiz consists of{" "}
                        <Box component="span" fontWeight="bold">
                          4 questions
                        </Box>
                        .
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem sx={{ pb: 2 }}>
                  <ListItemIcon>
                    <StarIcon sx={{ color: "#1976d2" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        Each question is worth{" "}
                        <Box component="span" fontWeight="bold">
                          5 marks
                        </Box>
                        .
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem sx={{ pb: 2 }}>
                  <ListItemIcon>
                    <LooksOneIcon sx={{ color: "#1976d2" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        Each question has{" "}
                        <Box component="span" fontWeight="bold">
                          1 correct answer
                        </Box>{" "}
                        from the available options.
                      </Typography>
                    }
                  />
                </ListItem>

                <ListItem sx={{ pb: 2 }}>
                  <ListItemIcon>
                    <AssessmentOutlinedIcon sx={{ color: "#1976d2" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        After completing the quiz, you can review your
                        performance and see the score.
                      </Typography>
                    }
                  />
                </ListItem>
              </List>

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mt: 2,
                  mb: 3,
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  borderRadius: 3,
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                }}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Navigation Guide:
                </Typography>
                <Stack spacing={2} mt={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ minWidth: "40px" }}
                    >
                      1
                    </Button>
                    <Typography variant="body1">
                      This means you are currently on this question
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ minWidth: "40px" }}
                    >
                      1
                    </Button>
                    <Typography variant="body1">
                      This means you have attempted this question
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ minWidth: "40px" }}
                    >
                      1
                    </Button>
                    <Typography variant="body1">
                      This means you have not attempted this question
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>

              <Alert
                icon={<InfoOutlinedIcon />}
                severity="info"
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  fontStyle: "italic",
                  backgroundColor: "rgba(25, 118, 210, 0.05)",
                }}
              >
                Note: You can directly switch the question by clicking on the
                numbered buttons below each question.
              </Alert>
            </Box>

            <Button
              variant="contained"
              onClick={handleNext}
              size="large"
              startIcon={<PlayArrowIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 6,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                background: "linear-gradient(45deg, #1976d2, #1565c0)",
                "&:hover": {
                  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              Start Quiz
            </Button>
          </Stack>
        </Paper>
      </Fade>
    </Container>
  );
}
