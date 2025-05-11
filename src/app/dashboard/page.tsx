"use client";
import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Box,
  Stack,
  Container,
  Paper,
  LinearProgress,
  Divider,
  Chip,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import RefreshIcon from "@mui/icons-material/Refresh";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useRouter } from "next/navigation";

interface ResultsType {
  score: number;
  perQuestionTimers: number[];
  totalTime: number;
}

export default function Dashboard() {
  const router = useRouter();

  const [results, setResults] = useState<ResultsType | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("quizResults");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  if (!results) {
    return (
      <Container
        maxWidth="md"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography
            variant="h5"
            mb={3}
            fontWeight="medium"
            color="text.secondary"
          >
            Loading your results...
          </Typography>
          <LinearProgress color="primary" sx={{ height: 8, borderRadius: 4 }} />
        </Box>
      </Container>
    );
  }

  const totalQuestions = 4;
  const totalMarks = results.score * 5;
  const percentage = Math.round((results.score / totalQuestions) * 100);
  const correct = results.score;
  const incorrect = totalQuestions - correct;

  // Get performance status based on percentage
  const getPerformanceStatus = () => {
    if (percentage >= 80) return { label: "Excellent", color: "#2e7d32" }; // success.main
    if (percentage >= 60) return { label: "Good", color: "#0288d1" }; // info.main
    if (percentage >= 40) return { label: "Average", color: "#ed6c02" }; // warning.main
    return { label: "Needs Improvement", color: "#d32f2f" }; // error.main
  };

  const performance = getPerformanceStatus();

  const scoreChartData = [
    {
      label: `${percentage}%`,
      value: percentage,
      color: performance.color,
    },
    {
      value: 100 - percentage,
      color: "rgba(0, 0, 0, 0.12)", // Equivalent to grey[200] with alpha
    },
  ];

  const handleRetry = () => {
    router.push("/");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 4, md: 8 },
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Stack spacing={4} alignItems="center">
          <Box textAlign="center">
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                mb: 1,
                background: "linear-gradient(45deg, #1976d2, #9c27b0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Quiz Results
            </Typography>

            <Chip
              icon={<EmojiEventsIcon />}
              label={performance.label}
              sx={{
                bgcolor: `${performance.color}20`, // 20 is hex for 12% opacity
                color: performance.color,
                fontWeight: "medium",
                px: 1,
              }}
            />
          </Box>

          {/* Score Overview Section */}
          <Box
            sx={{
              width: "100%",
              p: 3,
              borderRadius: 3,
              backgroundColor: "rgba(250, 250, 250, 0.8)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={1} alignItems="center">
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PieChart
                      width={200}
                      height={200}
                      series={[
                        {
                          startAngle: -90,
                          endAngle: 90,
                          innerRadius: 80,
                          outerRadius: 100,
                          data: scoreChartData,
                          highlightScope: {
                            fade: "global",
                            highlight: "item",
                          },
                          faded: {
                            innerRadius: 80,
                            outerRadius: 100,
                            color: "gray",
                          },
                        },
                      ]}
                      hideLegend
                    />
                    <Typography
                      variant="h2"
                      fontWeight="bold"
                      color={performance.color}
                      sx={{
                        position: "absolute",
                        textShadow: `0 0 10px ${performance.color}40`, // 40 is hex for 25% opacity
                      }}
                    >
                      {percentage}%
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Total Score
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {totalMarks} / 20
                    </Typography>
                  </Box>

                  <Divider />

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CheckCircleOutlineIcon color="success" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Correct
                          </Typography>
                          <Typography variant="h6" fontWeight="medium">
                            {correct} / {totalQuestions}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <HighlightOffIcon color="error" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Incorrect
                          </Typography>
                          <Typography variant="h6" fontWeight="medium">
                            {incorrect} / {totalQuestions}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {/* Timer Summary */}
          <Card
            sx={{
              width: "100%",
              borderRadius: 3,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
            }}
          >
            <Box sx={{ bgcolor: "rgba(25, 118, 210, 0.05)", py: 1.5, px: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TimerOutlinedIcon color="primary" />
                <Typography variant="h6" fontWeight="medium">
                  Time Analysis
                </Typography>
              </Stack>
            </Box>

            <Divider />

            <CardContent sx={{ py: 2 }}>
              <Stack spacing={2}>
                {results.perQuestionTimers.map((time, index) => (
                  <Box key={index}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      mb={0.5}
                    >
                      <Typography variant="body2" fontWeight="medium">
                        Question {index + 1}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {time}s
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={Math.min(
                        (time / Math.max(...results.perQuestionTimers)) * 100,
                        100
                      )}
                      sx={{
                        height: 6,
                        borderRadius: 1,
                        bgcolor: "rgba(25, 118, 210, 0.1)",
                      }}
                    />
                  </Box>
                ))}

                <Divider sx={{ my: 1 }} />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total Time
                  </Typography>
                  <Chip
                    label={`${results.totalTime}s`}
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            size="large"
            startIcon={<RefreshIcon />}
            onClick={handleRetry}
            sx={{
              borderRadius: 6,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
              background: "linear-gradient(45deg, #1976d2, #1565c0)",
            }}
          >
            Try Again
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
