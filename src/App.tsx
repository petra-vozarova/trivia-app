import { useContext, useState } from "react";
import "./App.css";
import Quiz from "./components/quiz";
import { Button, Divider } from "@mui/material";
import { QuizDataContext } from "./context/context";
import Stack from "@mui/material/Stack";

function App() {
  const { quizData, setQuizData } = useContext(QuizDataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTRiviaData() {
    setLoading(true);
    try {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
      );
      const data = await res.json();
      if (data.results) {
        setLoading(false);
        setQuizData(data.results);
      }
    } catch (e: any) {
      setLoading(false);
      setError(e.message);
      console.log(e);
    }
  }

  const handleTriviaStart = () => {
    fetchTRiviaData();
  };

  if (error) return <div>Error occured {error}</div>;
  return (
    <div className='App'>
      <header>
        <h1 style={{fontFamily: "Reddit Mono"}}>Trivia Quiz App</h1>
      </header>
      <Divider color={'white'}/>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        height={"80%"}
      >
        {loading && <div>Loading...</div>}
        {quizData && quizData.length > 0 ? (
          <Quiz />
        ) : (
          <Button
            onClick={handleTriviaStart}
            variant="outlined"
            color="secondary"
            size="large"
            sx={{marginTop: '20px'}}

          >
            Start
          </Button>
        )}
      </Stack>
    </div>
  );
}

export default App;
