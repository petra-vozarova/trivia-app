import { Button } from "@mui/material";
import { useContext } from "react";
import { QuizDataContext } from "../context/context";

const QuizResults = ({ score }: { score: number }) => {
  const { quizData, setQuizData } = useContext(QuizDataContext);
  return (
    <div>
      <h1>Quiz Finished!</h1>
      <h2>
        You score is: {score} / {quizData.length}
      </h2>
      <Button
        variant="contained"
        onClick={() => {
          setQuizData([]);
        }}
        sx={{ marginTop: "15px" }}
      >
        Refresh
      </Button>
    </div>
  );
};

export default QuizResults;
