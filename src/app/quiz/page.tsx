"use client";
import { useEffect, useState } from "react";
import questionData from "../../dataset/dataset";
import { useRouter } from "next/navigation";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Button,
  LinearProgress,
  Box,
  Container,
  Paper,
  Stack,
  Chip,
  Fade,
  Grow,
  Grid,
  Divider,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MathRenderer from "../maths";

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  marks: number;
  difficulty: DifficultyLevel;
}
type DifficultyLevel = "Easy" | "Medium" | "Hard";

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const [selectedAnswers, setSelectedAnswers] = useState<
    (number | undefined)[]
  >([]);
  const [perQuestionTimers, setPerQuestionTimers] = useState<number[]>([
    0, 0, 0, 0,
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const difficulty =
      (sessionStorage.getItem("difficulty") as
        | "Easy"
        | "Medium"
        | "Hard"
        | "Any") || "Any";

    let questionList: Question[] = [];

    if (difficulty === "Any") {
      for (const level of ["Easy", "Medium", "Hard"] as DifficultyLevel[]) {
        const questionsWithDifficulty = questionData.questions[level].map(
          (q) => ({
            ...q,
            difficulty: level,
          })
        );
        questionList.push(...questionsWithDifficulty);
      }
    } else {
      questionList = questionData.questions[difficulty].map((q) => ({
        ...q,
        difficulty,
      }));
    }

    const shuffled = [...questionList].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 4));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPerQuestionTimers((prev) => {
        
        const updated = [...prev];
        updated[index] += 1;
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [index]);

  const timer = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const calculateScore = () => {
    let score = 0;
    selectedAnswers.forEach((answer, i) => {
      if (answer === questions[i].correctOption) {
        score++;
      }
    });
    return score;
  };

  const totaltime = () => {
    let totalTime = 0;
    perQuestionTimers.forEach((time) => {
      totalTime += time;
    });
    return totalTime;
  };

  const handleNext = () => {
    const currentQuestion = questions[index];
    const selectedAnswer = selectedAnswers[index];
    const selectedOptionText =
      selectedAnswer !== undefined
        ? currentQuestion.options[selectedAnswer - 1]
        : null;

    const correctAnswer =
      currentQuestion.options[currentQuestion.correctOption - 1];
    const difficulty = currentQuestion.difficulty;

    const prevResults = JSON.parse(
      sessionStorage.getItem("questionResults") || "[]"
    );

    prevResults.push({
      question: currentQuestion.question,
      selectedAnswer: selectedOptionText,
      correctAnswer,
      difficulty,
    });

    sessionStorage.setItem("questionResults", JSON.stringify(prevResults));
    // If we are on the last question, finish the quiz
    if (index + 1 === questions.length) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }

      const score = calculateScore();
      const totalTimeTaken = totaltime();

      sessionStorage.setItem(
        "quizResults",
        JSON.stringify({
          score,
          perQuestionTimers,
          totalTime: totalTimeTaken,
        })
      );

      router.push("/dashboard");
    } else {
      // If not the last question, simply move to the next question (skipping is allowed)
      setIndex(index + 1);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    const updatedAnswers = [...selectedAnswers];
    if (updatedAnswers[index] === optionIndex) {
      updatedAnswers[index] = undefined;
    } else {
      updatedAnswers[index] = optionIndex;
    }
    setSelectedAnswers(updatedAnswers);
  };

  if (isLoading) {
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
            Loading questions...
          </Typography>
          <LinearProgress color="primary" sx={{ height: 8, borderRadius: 4 }} />
        </Box>
      </Container>
    );
  }

  if (questions.length === 0) {
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
        <Typography variant="h5" color="error">
          No questions available. Please try again.
        </Typography>
      </Container>
    );
  }

  const current = questions[index];
  const progressPercentage = ((index + 1) / questions.length) * 100;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 }, minHeight: "100vh" }}>
      <Fade in timeout={500}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 4,
            border: "1px solid rgba(0, 0, 0, 0.08)",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Stack spacing={4}>
            <Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Chip
                  icon={<QuizIcon />}
                  label={`Question ${index + 1} of ${questions.length}`}
                  sx={{ bgcolor: "rgba(25, 118, 210, 0.08)", fontWeight: 500 }}
                />

                <Chip
                  icon={<AccessTimeIcon />}
                  label={timer(perQuestionTimers[index])}
                  color="primary"
                  variant="outlined"
                  sx={{
                    fontWeight: 500,
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                  }}
                />
              </Box>

              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: "rgba(0, 0, 0, 0.05)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 5,
                    background: `linear-gradient(90deg, 
                      #1976d2 0%, 
                      #1565c0 ${progressPercentage}%, 
                      #1565c0 100%)`,
                  },
                }}
              />
            </Box>

            {/* Question Section */}
            <Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Question {index + 1}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.3,
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                }}
              >
                <MathRenderer text={current.question} />
              </Typography>
            </Box>

            <Divider sx={{ opacity: 0.6 }} />

            {/* Options Section */}
            <Grid container spacing={2}>
              {current?.options?.map((option: string, i: number) => {
                const isSelected = selectedAnswers[index] === i + 1;
                const letterOption = String.fromCharCode(65 + i);

                return (
                  <Grid
                    container
                    spacing={2}
                    key={i}
                    sx={{ display: "flex" }}
                    component="div"
                  >
                    <Grow in timeout={300 + i * 100}>
                      <Card
                        elevation={isSelected ? 4 : 1}
                        sx={{
                          borderRadius: 3,
                          transition: "all 0.2s ease",
                          transform: isSelected ? "translateY(-4px)" : "none",
                          border: isSelected
                            ? "2px solid #1976d2"
                            : "2px solid #CCCCCC",
                          height: "100%",
                          "&:hover": {
                            borderColor: "#1976d2",
                            boxShadow: "0 5px 15px rgba(25, 118, 210, 0.15)",
                          },
                        }}
                      >
                        <CardActionArea
                          onClick={() => handleOptionSelect(i + 1)}
                          sx={{
                            height: "100%",
                            padding: 0.5,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <CardContent
                            sx={{
                              display: "flex",
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "center",
                              position: "relative",
                              pl: 5,
                              pr: 2,
                            }}
                          >
                            <Box
                              sx={{
                                width: 36,
                                height: 36,
                                minWidth: 36,
                                borderRadius: "50%",
                                bgcolor: isSelected
                                  ? "#1976d2"
                                  : "rgba(0, 0, 0, 0.06)",
                                color: isSelected ? "#fff" : "text.primary",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 600,
                                fontSize: "1rem",
                                position: "absolute",
                                left: 0,
                              }}
                            >
                              {isSelected ? <CheckCircleIcon /> : letterOption}
                            </Box>

                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 500,
                                color: isSelected ? "#1976d2" : "text.primary",
                                width: "100%",
                              }}
                            >
                              <MathRenderer text={option} />
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grow>
                  </Grid>
                );
              })}
            </Grid>

            {/* Navigation Section */}
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "stretch", sm: "center" }}
              mt={2}
            >
              <Button
                variant="outlined"
                onClick={handlePrevious}
                disabled={index === 0}
                startIcon={<ArrowBackIcon />}
                sx={{
                  borderRadius: "50px",
                  px: 3,
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                Previous
              </Button>

              <Stack direction="row" spacing={1} justifyContent="center">
                {questions.map((_, i) => {
                  const isCurrent = index === i;
                  const isAttempted = selectedAnswers[i] !== undefined;

                  let bgColor = "transparent";
                  let textColor = "text.secondary";
                  let borderColor = "rgba(0, 0, 0, 0.12)";

                  if (isCurrent) {
                    bgColor = "#1976d2";
                    textColor = "#ffffff";
                    borderColor = "#1976d2";
                  } else if (isAttempted) {
                    bgColor = "#4caf50";
                    textColor = "#ffffff";
                    borderColor = "#4caf50";
                  }

                  return (
                    <Box
                      key={i}
                      onClick={() => setIndex(i)}
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        bgcolor: bgColor,
                        color: textColor,
                        border: `2px solid ${borderColor}`,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          opacity: 0.9,
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      {i + 1}
                    </Box>
                  );
                })}
              </Stack>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderRadius: "50px",
                  px: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  background:
                    index + 1 === questions.length
                      ? "linear-gradient(45deg, #4caf50, #2e7d32)"
                      : "linear-gradient(45deg, #1976d2, #1565c0)",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                }}
              >
                {index + 1 === questions.length
                  ? "Finish Quiz"
                  : "Next Question"}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Fade>
    </Container>
  );
}
