import { useCallback, useState } from "react";
import questions from "./question";
import quizComplete from "../assets/quiz-complete.png";
import Questiontimer from "./questiontimer";

const Quiz = () => {
  //   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState([]);
  const activeQuestionIndex = selectedQuestion.length;
  const isQuizCompleted = activeQuestionIndex === questions.length;
  const handleSelectedAnswers = useCallback(function handleSelectedAnswers(
    answers
  ) {
    setSelectedQuestion((prevState) => {
      return [...prevState, answers];
    });
  },
  []);
  const skippedAnswers = useCallback(
    () => handleSelectedAnswers(null),
    [handleSelectedAnswers]
  );
  if (isQuizCompleted) {
    return (
      <div id="summary">
        <img src={quizComplete} alt="Quiz Complete"></img>
        <h2>Quiz is Completed</h2>
      </div>
    );
  }

  const shuffledAnswers = [...questions[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => {
    return Math.random() - 0.5;
  });

  return (
    <div id="quiz">
      <div id="question">
        <Questiontimer
          key={activeQuestionIndex}
          onTimeOut={skippedAnswers}
          timeout={10000}
        ></Questiontimer>
        <h2>{questions[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((item) => {
            return (
              <li key={item} className="answer">
                <button
                  onClick={() => {
                    handleSelectedAnswers(item);
                  }}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Quiz;
