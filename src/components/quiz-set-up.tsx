import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import { useContext, useState } from "react";
import { QuizDataContext } from "../context/context";
import { decodeData } from "../utils/utils";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const QuizSetUp = () => {
  const { setQuizData } = useContext(QuizDataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    category: 9,
    type: "multiple",
    difficulty: "easy",
  });

  async function fetchTRiviaData() {
    setLoading(true);
    const { category, type, difficulty } = formData;
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}&encode=url3986`
      );
      const data = await res.json();
      if (data.results) {
        const decodedData = decodeData(data.results);
        setLoading(false);
        setQuizData(decodedData);
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

  {
    loading && <div>Loading...</div>;
  }

  return (
    <Stack
      display={"flex"}
      gap={3}
      sx={{ color: "black", backgroundColor: "white" }}
      p={10}
    >
      <h2>Quiz preferences</h2>

      <FormControl>
        <InputLabel>Category</InputLabel>
        <NativeSelect
          defaultValue={9}
          onChange={(e) =>
            setFormData({ ...formData, category: +e.target.value })
          }
        >
          <option value={9}>General Knowledge</option>
          <option value={18}>Computers</option>
          <option value={23}>History</option>
          <option value={27}>Animals</option>
          <option value={19}>Mathematics</option>
          <option value={17}>Science & Nature</option>
          <option value={10}>Books</option>
        </NativeSelect>
      </FormControl>
      <FormControl>
        <InputLabel>Type</InputLabel>
        <NativeSelect
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value={"multiple"}>Multiple Choice</option>
          <option value={"boolean"}>True / False</option>
        </NativeSelect>
      </FormControl>
      <FormControl>
        <InputLabel>Difficulty</InputLabel>
        <NativeSelect
          onChange={(e) =>
            setFormData({ ...formData, difficulty: e.target.value })
          }
        >
          <option value={"easy"}>Easy</option>
          <option value={"medium"}>Medium</option>
          <option value={"hard"}>Hard</option>
        </NativeSelect>
      </FormControl>
      <Button
        onClick={handleTriviaStart}
        variant="outlined"
        color="secondary"
        size="large"
        sx={{ marginTop: "20px" }}
      >
        Start
      </Button>
    </Stack>
  );
};

export default QuizSetUp;
