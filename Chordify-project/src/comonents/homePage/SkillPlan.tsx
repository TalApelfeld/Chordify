import { motion } from "motion/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import QuizCard from "./QuizCard";

const serverURL = import.meta.env.VITE_SERVER_URL;

interface ISkillPlanProps {
  setBeginQuiz: Dispatch<SetStateAction<boolean>>;
}

export interface IDailyQuestions {
  question: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
}

export interface IDailyPlan {
  title: string;
  description: string;
  questions: IDailyQuestions[];
}

export default function SkillPlan({ setBeginQuiz }: ISkillPlanProps) {
  const [isDaySelected, setIsDaySelected] = useState(false);
  const [selectedDay, setSelecetdDay] = useState<number | null>(null);
  const [dailyPlans, setDailyPlans] = useState<IDailyPlan[] | null>(null);

  async function getPlansFroDB() {
    const res = await fetch(`${serverURL}/quiz`);
    const data = await res.json();
    setDailyPlans(data.data);
  }

  useEffect(() => {
    getPlansFroDB();
  }, []);

  return (
    <motion.div className="skill-modal-container">
      <motion.div
        className="skill-modal"
        animate={{
          opacity: [0, 1],
          translateY: ["20px", "1%"],
          transition: { duration: 1 },
        }}
      >
        <motion.button
          className="exit-btn-skill-modal"
          onClick={() => {
            setBeginQuiz(false);
          }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            height="24px"
            width="24px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </motion.svg>
        </motion.button>

        {!isDaySelected && dailyPlans ? (
          dailyPlans?.map((day: IDailyPlan, index: number) => (
            <div
              className="daily-box-container"
              onClick={() => {
                setSelecetdDay(index);
                setIsDaySelected(true);
              }}
              key={index}
            >
              <h1>{day.title}</h1>
              <span>{day.description}</span>
            </div>
          ))
        ) : !isDaySelected && !dailyPlans ? (
          <div className="spinner-skill-container">
            <span className="loader-skill"></span>
          </div>
        ) : (
          ""
        )}

        {isDaySelected && (
          <QuizCard
            numberOfDay={selectedDay}
            setIsDaySelected={setIsDaySelected}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
