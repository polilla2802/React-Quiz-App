import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { Difficulty, QuestionState, fetchQuizQuestions } from "./API";

export type UserAnswer = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS: number = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const start = async () => {
    setGameOver(false);

    setLoading(true);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);

    setScore(0);

    setUserAnswers([]);

    setQuestionNumber(0);

    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //Users answer
      const answer: string = e.currentTarget.value;
      //Check correct answer
      const correct: boolean =
        questions[questionNumber].correct_answer === answer;
      //Add score if answer is correct
      correct && setScore((prev) => prev + 1);
      //Save for user answers
      const userAnswer: UserAnswer = {
        question: questions[questionNumber].question,
        answer: answer,
        correct: correct,
        correctAnswer: questions[questionNumber].correct_answer,
      };
      //Add it to userAnswers
      setUserAnswers((prev) => [...prev, userAnswer]);

      const nextQuestionNumber = questionNumber + 1;

      if (nextQuestionNumber === TOTAL_QUESTIONS) {
        setGameOver(true);
      } else {
        setQuestionNumber(nextQuestionNumber);
      }
    }
  };

  return (
    <div className="App">
      <h1>React Videogame Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={start}>
          Start
        </button>
      ) : null}
      {!gameOver && !loading && <p className="score">Score: {score}</p>}
      {loading && <p>Loading...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={questionNumber + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[questionNumber].question}
          answers={questions[questionNumber].answers}
          userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
          callback={checkAnswer}
        />
      )}
    </div>
  );
};

export default App;
