import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { Difficulty, QuestionState, fetchQuizQuestions } from "./API";
import { GlobalStyle, Wrapper } from "./App.styles";
export type UserAnswer = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS: number = 1;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [lost, setLost] = useState(false);
  const [won, setWon] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const start = async () => {
    setGameOver(false);
    setLost(false);
    setWon(false);

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

      if (correct) {
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
          setWon(true);
        } else {
          setQuestionNumber(nextQuestionNumber);
        }
      } else {
        setLost(true);
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
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1 className="text-bg">
          {won ? "You Win!" : lost ? "You lose" : "Quiz Time!"}
        </h1>
        {!gameOver && !loading && <p className="text-bg">Score: {score}</p>}
        {loading && <p className="text-bg">Loading...</p>}
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
        {gameOver ? (
          <button className="start" onClick={start}>
            Start
          </button>
        ) : lost || won ? (
          <button className="start" onClick={start}>
            Restart
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
