import styles from "./Homepage.module.css";
import MiddleContent from "../comonents/homePage/MiddleContent";
import SideBarLeft from "../comonents/homePage/SideBarLeft";
import { useEffect, useState } from "react";
import PersonalTestModal from "../comonents/homePage/PersonalTestModal";
import WeeklyPlan from "../comonents/homePage/WeeklyPlan";
import SideBarDesktop from "../comonents/homePage/SideBarDesktop";

const serverURL = import.meta.env.VITE_SERVER_URL;

const questions = [
  {
    number: 0,
    title: "What is your current skill level with the guitar?",
    options: ["Absolute Beginner", "Beginner", "Intermediate", "Advanced"],
  },
  {
    number: 1,
    title: "How much time can you dedicate to practicing each week?",
    options: [
      "Less than 1 hour",
      " 1-3 hours",
      " 3-5 hours",
      " More than 5 hours",
    ],
  },
  {
    number: 2,
    title: "What are your main goals for learning guitar?",
    options: [
      " Playing for fun",
      "Joining a band",
      "Professional development",
      " Songwriting",
    ],
  },
  {
    number: 3,
    title: "Do you have any musical background or play other instruments?",
    options: ["Yes", "No"],
  },
  {
    number: 4,
    title: "What genres of music are you most interested in playing?",
    options: [" Rock", " Blues", "Jazz", "Classical", "Pop", "Folk", "Other"],
  },
  {
    number: 5,
    title:
      "Do you prefer learning through video tutorials, written materials, or both?",
    options: ["Video", "Written", "Both"],
  },
  {
    number: 6,
    title: "How do you prefer to receive feedback on your progress?",
    options: [
      " Self-assessment",
      "Online community reviews",
      "Regular check-ins with a mentor",
    ],
  },
];

export interface IQuestion {
  number: number;
  title: string;
  options: string[];
}

export interface ILearningPlan {
  title: string;
  goals: string[];
}

export default function Home() {
  console.log(window.location.origin);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menuButtonClicked, setMenuButtonClicked] = useState(false);
  const [timeGreeting, setTimeGreeting] = useState("");
  const [showPreferenceWindow, setShowPreferenceWindow] = useState(false);
  const [currentPersonalWindow, setCurrentPersonalWindow] = useState(0);
  const [answersArray, setAnswersArray] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [showWeeklyPlan, setShowWeeklyPlan] = useState(false);
  const [learningPlan, setLearningPlan] = useState<ILearningPlan[] | null>(
    null
  );
  const [checkedCount, setCheckedCount] = useState(0);
  const totalCheckboxes = learningPlan
    ? learningPlan.reduce((acc, week) => acc + week.goals.length, 0)
    : 0;

  async function getPlanFromDB() {
    const res = await fetch(`${serverURL}/home/learningplan`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.plan[0].learningPlan.length === 0) {
      setShowPreferenceWindow(true);
    } else {
      setLearningPlan(data.plan[0].learningPlan);
    }
    console.log(data);
  }

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

    getPlanFromDB();

    getTime();
  }, []);

  console.log(answersArray);

  async function getLearningPlan() {
    setIsLoading(true);
    try {
      const res = await fetch(`${serverURL}/home/learningplan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: answersArray }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("there been an error in fetching the plan");
      }

      const data = await res.json();
      setLearningPlan(data.data.learning_plan);
      setIsLoading(false);
      setShowPreferenceWindow(false);
      setShowWeeklyPlan(true);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (learningPlan) {
    console.log("hello from ", learningPlan);
  }

  return (
    <div className={`${styles.homepageContainer} homepage-container `}>
      <SideBarLeft
        menuButtonClicked={menuButtonClicked}
        setMenuButtonClicked={setMenuButtonClicked}
        setShowWeeklyPlan={setShowWeeklyPlan}
      />

      <SideBarDesktop
        menuButtonClicked={menuButtonClicked}
        setMenuButtonClicked={setMenuButtonClicked}
        setShowWeeklyPlan={setShowWeeklyPlan}
      />

      <MiddleContent
        timeGreeting={timeGreeting}
        checkedCount={checkedCount}
        totalCheckboxes={totalCheckboxes}
        menuButtonClicked={menuButtonClicked}
        setMenuButtonClicked={setMenuButtonClicked}
      />

      {showPreferenceWindow &&
        questions.map((questionObj: IQuestion, index: number) =>
          index === currentPersonalWindow ? (
            <PersonalTestModal
              key={questionObj.number}
              setShowPreferenceWindow={setShowPreferenceWindow}
              questionObj={questionObj}
              currentPersonalWindow={currentPersonalWindow}
              setCurrentPersonalWindow={setCurrentPersonalWindow}
              answersArray={answersArray}
              setAnswersArray={setAnswersArray}
              getLearningPlan={getLearningPlan}
              isLoading={isLoading}
            />
          ) : (
            ""
          )
        )}

      {showWeeklyPlan && (
        <WeeklyPlan
          learningPlan={learningPlan}
          setShowWeeklyPlan={setShowWeeklyPlan}
          setCheckedCount={setCheckedCount}
        />
      )}
    </div>
  );
}
