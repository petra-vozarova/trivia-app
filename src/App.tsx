import { useContext, useState } from "react";
import "./App.css";
import Quiz from "./components/quiz";
import { Button, Divider } from "@mui/material";
import { QuizData, QuizDataContext } from "./context/context";
import Stack from "@mui/material/Stack";
import { decodeData } from "./utils/utils";
import QuizSetUp from "./components/quiz-set-up";

function App() {
  const { quizData} = useContext(QuizDataContext);

  return (
    <div className="App">
      <header>
        <h1 style={{ fontFamily: "Reddit Mono" }}>Trivia Quiz App</h1>
      </header>
      <Divider color={"white"} sx={{ width: "50%", m: "auto" }} />
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        height={"80%"}
      >

        {quizData && quizData.length > 0 ? <Quiz /> : <QuizSetUp></QuizSetUp>}
      </Stack>
    </div>
  );
}

export default App;
