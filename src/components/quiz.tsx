import { useContext, useEffect, useState } from "react";
import { QuizDataContext } from "../context/context";
import Button from "@mui/material/Button";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  Box,
} from "@mui/material";

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [finished, setFinished] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [helperText, setHelperText] = useState("Choose wisely");

  const { quizData } = useContext(QuizDataContext);
  const { question, correct_answer, type, incorrect_answers } =
    quizData[currentQuestion];

  let answers = [correct_answer, ...incorrect_answers];
  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    answers = shuffleArray(answers);
  }, [currentQuestion]);

  const displayCorrectAnswer = () => {
    if (answer === correct_answer) {
      setScore((prev) => prev + 1);
      setHelperText("Correct!");
    } else {
      setHelperText("Sorry, wrong answer!");
    }
  };

  const displayNextQuestion = () => {
    if (currentQuestion + 1 < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswer("");
      setHelperText("Choose wisely");
    } else {
      setFinished(true);
    }
  };

  const handleButtonClick = () => {
    if (showCorrectAnswer) {
      displayNextQuestion();
      setShowCorrectAnswer(false);
    } else {
      setShowCorrectAnswer(true);
      displayCorrectAnswer();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  console.log("quiz component rerenders");
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      {finished ? (
        <div>
          <h1>Quiz Finished!</h1>
          <h2>
            You score is: {score} / {quizData.length}
          </h2>
        </div>
      ) : (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <h2 style={{ fontSize: "25px" }}>{question}</h2>
          <FormControl sx={{ fontWeight: "bold" }}>
            <RadioGroup value={showCorrectAnswer ? correct_answer : answer}>
              {answers.map((currentAnswer, index) => (
                <>
                  <FormControlLabel
                    key={index}
                    value={currentAnswer}
                    control={
                      <Radio
                        disabled={
                          showCorrectAnswer && correct_answer !== currentAnswer
                        }
                        sx={{ padding: 2 }}
                        onChange={handleChange}
                        color={
                          showCorrectAnswer && correct_answer === currentAnswer
                            ? "secondary"
                            : "primary"
                        }
                      />
                    }
                    label={currentAnswer}
                  />
                  <Divider />
                </>
              ))}
            </RadioGroup>
            <FormHelperText style={{ color: "white", fontSize: "14px" }}>
              {helperText}
            </FormHelperText>

            <Button
              variant="contained"
              onClick={handleButtonClick}
              disabled={answer === "" ? true : false}
              sx={{ marginTop: "15px" }}
            >
              {showCorrectAnswer ? "Next Question" : "Submit Answer"}
            </Button>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default Quiz;
