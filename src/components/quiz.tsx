import { useContext, useEffect, useState } from "react";
import { QuizDataContext } from "../context/context";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Button,
  Box,
} from "@mui/material";
import QuizResults from "./quiz-results";
import { shuffleArray } from "../utils/utils";
import CountDown from "./count-down";

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [finished, setFinished] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [helperText, setHelperText] = useState("Choose wisely");
  const [isTimeUp, setIsTimeUp] = useState(false);

  const { quizData } = useContext(QuizDataContext);
  const { question, correct_answer, type, incorrect_answers } =
    quizData[currentQuestion];

  let answers = [correct_answer, ...incorrect_answers];

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

  const handleAnswer = () => {
    console.log(answer);
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

  const handleCountDownFinish = () => {
    setIsTimeUp(true);
    handleAnswer();
  };

  console.log("quiz component rerenders");

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      {finished ? (
        <QuizResults score={score} />
      ) : (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <CountDown
            start={!showCorrectAnswer}
            onFinish={handleCountDownFinish}
          />
          <h2
            style={{
              fontSize: "25px",
              maxWidth: "70%",
            }}
          >
            {question}
          </h2>
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
              onClick={()=> handleAnswer()}
              disabled={answer === "" && !showCorrectAnswer ? true : false}
              sx={{ marginTop: "15px" }}
            >
              {showCorrectAnswer ? "Next" : "Submit Answer"}
            </Button>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default Quiz;
