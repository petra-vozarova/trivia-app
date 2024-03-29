import { QuizData } from "../context/context";

export function decodeData(data: QuizData[]): QuizData[] {
  data.forEach((quiz) => {
    quiz.question = decodeURIComponent(quiz.question);
    quiz.correct_answer = decodeURIComponent(quiz.correct_answer);
    quiz.incorrect_answers = quiz.incorrect_answers.map((ans) =>
      decodeURIComponent(ans)
    );
  });
  return data;
}

export function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

