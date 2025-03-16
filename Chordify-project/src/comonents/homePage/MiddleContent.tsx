import { Dispatch, SetStateAction } from "react";
import PieChart from "./PieChart";
import { motion } from "motion/react";
import { delay, stagger } from "motion";

interface middleContentProps {
  timeGreeting: string;
  checkedCount: number;
  totalCheckboxes: number;
  menuButtonClicked: boolean;
  setMenuButtonClicked: Dispatch<SetStateAction<boolean>>;
}

export default function MiddleContent({
  timeGreeting,
  checkedCount,
  totalCheckboxes,
  menuButtonClicked,
  setMenuButtonClicked,
}: middleContentProps) {
  const titleSpan = {
    visible: {
      opacity: [0, 1],
      translateY: ["20px", 0],
      transition: {
        duration: 2.5,
      },
    },
  };
  return (
    <div className="middle-homepage-content-mobile">
      {/* //* Upper Section */}
      <div className="upper-section">
        <button
          className={`menu-button ${
            menuButtonClicked ? "menu-button-clicked" : ""
          }`}
          onClick={() => {
            setMenuButtonClicked(!menuButtonClicked);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            height="48px"
            width="48px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <motion.h1>
          {timeGreeting.split("").map((char, index: number) => (
            <motion.span
              variants={titleSpan}
              animate="visible"
              className="letter"
              key={index}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          Personolized plan
        </motion.p>

        {/* //* Your progress */}
        <div className="progress-container">
          <h2>your progress</h2>
          <PieChart
            checkedCount={checkedCount}
            totalCheckboxes={totalCheckboxes}
          />
        </div>
      </div>
      <div className="bottom-section">
        {/* //* Skill-Assesment */}
        <motion.div
          className="skill-assesment-container"
          initial={{ opacity: 0, translateY: "-20px" }}
          // animate={{ opacity: [0, 1], translateY: ["20px", 0] }}
          animate={{ opacity: 1, translateY: 0, transition: { duration: 2 } }}
          // transition={}

          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width="32px"
            height="32px"
            className="svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
          </svg>
          <p className="skill-p">Skill Assesment</p>
          <p className="testKnoledge-p">Test your knoledge now!</p>
          <button className="test-button bg-background-grey rounded-2xl py-3 px-6 self-end font-semibold">
            Begin quiz
          </button>
        </motion.div>
        {/* //* Guitar-Basics-quiz */}
        <motion.div
          className="Guitar-Basics-quiz skill-assesment-container"
          initial={{ opacity: 0, translateY: "-20px" }}
          // animate={{ opacity: [0, 1], translateY: ["20px", 0] }}
          animate={{ opacity: 1, translateY: 0, transition: { duration: 2 } }}
          // transition={}

          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width="32px"
            height="32px"
            className="svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
            />
          </svg>

          <p className="skill-p">Guitar Basics</p>
          <p className="testKnoledge-p">Essential chords for begginers</p>
          <button className="start-learning-button bg-background-grey rounded-2xl py-3 px-5 self-end font-semibold">
            Start learning
          </button>
        </motion.div>
      </div>
    </div>
  );
}
