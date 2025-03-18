import { motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IDailyQuestions } from "./SkillPlan";

// const goToURL = import.meta.env.VITE_GO_TO;
const serverURL = import.meta.env.VITE_SERVER_URL;

interface IQuizCard {
  numberOfDay: number | null;
  setIsDaySelected: Dispatch<SetStateAction<boolean>>;
}

export default function QuizCard({ numberOfDay, setIsDaySelected }: IQuizCard) {
  const [questions, setQuestions] = useState<IDailyQuestions[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  async function getDailyPlanFromDB() {
    const res = await fetch(`${serverURL}/quiz/${numberOfDay}`);
    const data = await res.json();
    setQuestions(data.data.questions);
    console.log(data);
  }

  useEffect(() => {
    //// fetching the right day from DB
    getDailyPlanFromDB();
  }, []);

  return (
    <motion.div
      className="quiz-card"
      animate={{
        opacity: [0, 1],
        translateY: ["20px", 0],
        transition: { duration: 0.5 },
      }}
    >
      {/* //* Total Questions */}
      <span
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          translate: "-50% 0",
          fontSize: "1.8rem",
          paddingTop: "2rem",
          color: "#4e5156",
        }}
      >{`${currentQuestion + 1}/${questions.length}`}</span>

      {/* //* Return Button */}
      <motion.button
        className="arrow-btn-skill-modal"
        onClick={() => {
          setIsDaySelected(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          width="24px"
          height="24px"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </motion.button>
      {/* //* Questions */}

      {questions?.map((question: IDailyQuestions, indexQuestion: number) => {
        if (currentQuestion === indexQuestion) {
          return (
            <motion.div
              layout
              key={indexQuestion}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1>{question.question}</h1>
              <ol>
                {question.answers.map((answer, indexAnswer) => (
                  <motion.li
                    key={indexAnswer + 1}
                    style={{
                      marginBottom: "1.2rem",
                      border: "1px solid lavender",
                      borderRadius: "6px",
                      padding: "1rem 4.8rem",
                      backgroundColor: `${
                        selectedAnswer === question.correctAnswer
                          ? selectedAnswer === indexAnswer
                            ? "green"
                            : ""
                          : selectedAnswer === indexAnswer
                          ? "red"
                          : ""
                      }`,
                    }}
                    whileTap={{
                      backgroundColor: "rgba(7, 76, 94, 0.892)",
                      scale: 0.95,
                    }}
                    onClick={() => {
                      setSelectedAnswer(indexAnswer);
                      if (indexAnswer === question.correctAnswer) {
                        setShowExplanation(true);
                      }
                    }}
                  >
                    {answer}
                  </motion.li>
                ))}
              </ol>

              {/* //* Explanation */}
              {showExplanation && indexQuestion === currentQuestion ? (
                <motion.span
                  animate={{
                    opacity: [0, 1],
                    translateY: ["20px", 0],
                    transition: { duration: 0.5 },
                  }}
                  style={{
                    fontSize: "1.8rem",
                    textAlign: "center",
                    padding: "0 1.2rem",
                  }}
                >
                  * {question.explanation}
                </motion.span>
              ) : (
                ""
              )}
            </motion.div>
          );
        }
      })}

      {/* //* Prev / Next */}
      <div className="skill-quiz-contianer">
        <motion.button
          onClick={() => {
            if (currentQuestion === 0) {
              setCurrentQuestion(0);
            } else {
              setSelectedAnswer(null);
              setShowExplanation(false);
              setCurrentQuestion((current: number) => current - 1);
            }
          }}
          whileTap={{ backgroundColor: "rgba(7, 76, 94, 0.892)", scale: 0.95 }}
        >
          Prev
        </motion.button>
        <motion.button
          onClick={() => {
            if (currentQuestion === questions?.length - 1) {
              setCurrentQuestion(currentQuestion);
            } else {
              setSelectedAnswer(null);
              setShowExplanation(false);
              setCurrentQuestion((current: number) => current + 1);
            }
          }}
          whileTap={{ backgroundColor: "rgba(7, 76, 94, 0.892)", scale: 0.95 }}
        >
          next
        </motion.button>
      </div>
    </motion.div>
  );
}
