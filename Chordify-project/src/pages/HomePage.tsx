// import Grid from "@mui/material/Grid";
// import Sidebar from "../components/home/Sidebar";
// import HomeContent from "../components/home/HomeContent";
// import TopSearches from "../components/home/TopSearches";
import styles from "../comonents/homePage/gridContainer.module.css";
import MiddleContent from "../comonents/homePage/MiddleContent";
import SideBarLeft from "../comonents/homePage/SideBarLeft";
import RightContent from "../comonents/homePage/RightContent";
import { useEffect, useReducer, useState } from "react";

import PersonalTestModal from "../comonents/homePage/PersonalTestModal";
import LearningPlanModal from "../comonents/homePage/LearningPlanModal";
import WeeklyPlan from "../comonents/homePage/WeeklyPlan";

const questions = [
  {
    number: 1,
    name: "What is your current skill level with the guitar?",
    options: ["Absolute Beginner", "Beginner", "Intermediate", "Advanced"],
  },
  {
    number: 2,
    name: "How much time can you dedicate to practicing each week?",
    options: [
      "Less than 1 hour",
      " 1-3 hours",
      " 3-5 hours",
      " More than 5 hours",
    ],
  },
  {
    number: 3,
    name: "What are your main goals for learning guitar?",
    options: [
      " Playing for fun",
      "Joining a band",
      "Professional development",
      " Songwriting",
    ],
  },
  {
    number: 4,
    name: "Do you have any musical background or play other instruments?",
    options: ["Yes", "No"],
  },
  {
    number: 5,
    name: "What genres of music are you most interested in playing?",
    options: [" Rock", " Blues", "Jazz", "Classical", "Pop", "Folk", "Other"],
  },
  {
    number: 6,
    name: "Do you prefer learning through video tutorials, written materials, or both?",
    options: ["Video", "Written", "Both"],
  },
  {
    number: 7,
    name: "How do you prefer to receive feedback on your progress?",
    options: [
      " Self-assessment",
      "Online community reviews",
      "Regular check-ins with a mentor",
    ],
  },
];

interface Question {
  number: number;
  name: string;
  options: string[];
}

interface Action {
  type: string;
  payload?: any; // You can specify further typing for payload if needed
}

interface State {
  questions: Question[];
  isLoading: boolean;
  curQuestion: number;
  curAnswer: string;
  answers: string[];
}

interface PlanHomeProps {
  h1: string;
  h2: string[];
  li: string[];
}

const initialState = {
  questions,
  isLoading: false,
  curQuestion: 0,
  curAnswer: "",
  answers: [],
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setCurAnswer":
      return { ...state, curAnswer: action.payload };

    case "nextQuestion":
      return { ...state, curQuestion: state.curQuestion + 1 };

    case "setAnswers":
      return { ...state, answers: [...state.answers, state.curAnswer] };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ questions, curQuestion, answers }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [modal, setModal] = useState(false);

  const [timeGreeting, setTimeGreeting] = useState("");

  // h1:week , h2 :day , li:assigment
  const [learningPlanHome, setLearningPlanHome] = useState(() => {
    const learningPlanObject = localStorage.getItem("plan");
    if (!learningPlanObject) setModal(true);

    if (!learningPlanObject) return { h1: "", h2: [""], li: [""] };

    const parsedLearningPlanObject = JSON.parse(learningPlanObject);

    return parsedLearningPlanObject;
  });

  // set the welcome text based on the time
  useEffect(() => {
    const getTime = async function () {
      const now: Date = new Date();
      const hour: number = now.getHours();

      if (hour < 12) {
        setTimeGreeting("Good morning");
      } else if (hour >= 12 && hour <= 17) {
        setTimeGreeting("Good afternoon");
      } else {
        setTimeGreeting("Good evening");
      }
    };
    getTime();
  }, []);

  // close the modal
  function handleModalClose() {
    // in oreder to make the "curQuestion === 7" be false
    dispatch({ type: "nextQuestion" });
    setModal(false);
  }

  // open the modal
  function handleModalOpen() {
    setModal(true);
  }

  // put the current answer in a state
  function handleCurAnswer(answer: string) {
    dispatch({ type: "setCurAnswer", payload: answer });
  }

  // go to next question
  function handleNextQuestion() {
    dispatch({ type: "setAnswers" });
    dispatch({ type: "nextQuestion" });
  }

  function handleSetPlanHome(plan: PlanHomeProps) {
    setLearningPlanHome(plan);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const chunkArray = (arr: string[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const assignmentsPerDay = chunkArray(learningPlanHome.li, 5);

  const [checkedState, setCheckedState] = useState(
    assignmentsPerDay.map((dayAssignments) => dayAssignments.map(() => false))
  );

  const handleCheckboxChange = (dayIndex: number, taskIndex: number) => {
    const updatedCheckedState = [...checkedState];
    updatedCheckedState[dayIndex][taskIndex] =
      !updatedCheckedState[dayIndex][taskIndex];
    setCheckedState(updatedCheckedState);
  };

  const calculateCheckedCount = () => {
    let checkedCheckboxes = 0;

    checkedState.forEach((day) => {
      day.forEach((isChecked) => {
        if (isChecked) {
          checkedCheckboxes += 1;
        }
      });
    });

    return checkedCheckboxes;
  };

  const checkedCount = calculateCheckedCount();
  const totalCheckboxes = learningPlanHome.li.length;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className={styles.grid}>
      <SideBarLeft handleModalOpen={handleModalOpen} />

      <MiddleContent
        timeGreeting={timeGreeting}
        checkedCount={checkedCount}
        totalCheckboxes={totalCheckboxes}
      />
      <RightContent />
      {/* {learningPlanHome.h1 ? (
        modal ? (
          <WeeklyPlan
            handleModalClose={handleModalClose}
            learningPlanHome={learningPlanHome}
          />
        ) : null
      ) : (
        questions.map((question: Question, index: number) =>
          index === curQuestion ? (
            <PersonalTestModal
              key={question.number}
              question={question}
              handleModalClose={handleModalClose}
              handleNextQuestion={handleNextQuestion}
              onSetCurAnswer={handleCurAnswer}
            />
          ) : null
        )
      )} */}

      {!learningPlanHome.h1 && modal
        ? questions.map((question: Question, index: number) =>
            index === curQuestion ? (
              <PersonalTestModal
                key={question.number}
                question={question}
                handleModalClose={handleModalClose}
                handleNextQuestion={handleNextQuestion}
                onSetCurAnswer={handleCurAnswer}
              />
            ) : null
          )
        : null}

      {learningPlanHome.h1 && modal ? (
        <WeeklyPlan
          handleModalClose={handleModalClose}
          learningPlanHome={learningPlanHome}
          handleCheckboxChange={handleCheckboxChange}
          assignmentsPerDay={assignmentsPerDay}
          checkedState={checkedState}
        />
      ) : null}

      {curQuestion === 7 && modal ? (
        <LearningPlanModal
          handleModalClose={handleModalClose}
          answers={answers}
          handleSetPlanHome={handleSetPlanHome}
        />
      ) : null}
    </div>
  );
}
