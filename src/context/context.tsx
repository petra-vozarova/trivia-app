import React, { createContext, useMemo, useState } from "react";

interface QuizData {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export const QuizDataContext = createContext<{
  quizData: QuizData[];
  setQuizData: React.Dispatch<React.SetStateAction<QuizData[]>>;
}>({ quizData: [], setQuizData: () => {} });

export const QuizDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const value = useMemo(() => ({ quizData, setQuizData }), [quizData]);

  console.log("context rerenders");
  return (
    <QuizDataContext.Provider value={value}>
      {children}
    </QuizDataContext.Provider>
  );
};
