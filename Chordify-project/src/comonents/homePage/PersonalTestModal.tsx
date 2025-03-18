import { motion } from "motion/react";
import { Dispatch, SetStateAction, useState } from "react";
import { IQuestion } from "../../pages/HomePage";

interface PersonalTestProps {
  currentPersonalWindow: number;
  setCurrentPersonalWindow: Dispatch<SetStateAction<number>>;
  setShowPreferenceWindow: Dispatch<SetStateAction<boolean>>;
  questionObj: IQuestion;
  answersArray: string[];
  setAnswersArray: Dispatch<SetStateAction<string[]>>;
  getLearningPlan: () => void;
  isLoading: boolean;
}

export default function PersonalTestModal({
  questionObj,
  currentPersonalWindow,
  setCurrentPersonalWindow,
  setShowPreferenceWindow,
  answersArray,
  setAnswersArray,
  getLearningPlan,
  isLoading,
}: PersonalTestProps) {
  const [buttonNumber, setButtonNumber] = useState<number | null>(0);
  const [navigationButtonClicked, setNavigationButtonClicked] = useState(false);
  const [exitButtonClicked, setExitButtonClicked] = useState(false);

  function updateAnswersArray(answer: string) {
    const newArr = [...answersArray];
    newArr[currentPersonalWindow] = answer;
    setAnswersArray(newArr);
  }

  return (
    <motion.div
      className="personal-preference-window"
      animate={{
        opacity: [0, 1],
        translateY: ["20px", "-50%"],
        translateX: ["-50%", "-50%"],
        transition: { duration: 1 },
      }}
    >
      <h1>{questionObj.title}</h1>

      <div className="personal-preference-options">
        <div className="number-of-page-container">
          {currentPersonalWindow + 1}/7
        </div>

        <div
          className={`exit-btn ${
            exitButtonClicked ? "personal-preference-options-btn-clicked" : ""
          }`}
          onClick={() => {
            setExitButtonClicked(true);
            setShowPreferenceWindow(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
            width="32px"
            height="32px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>

        {questionObj.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => {
              setButtonNumber(index);
              updateAnswersArray(option);
            }}
            className={`${
              index === buttonNumber
                ? "personal-preference-options-btn-clicked"
                : ""
            }`}
          >
            {index + 1}.&nbsp;&nbsp;{option}
          </button>
        ))}
      </div>

      <div className="personal-navigation-buttons-container">
        <button
          className={`${
            navigationButtonClicked
              ? "personal-preference-options-btn-clicked"
              : ""
          }`}
          onClick={() => {
            setCurrentPersonalWindow((prev: number) => {
              if (prev === 0) {
                return prev;
              } else {
                return prev - 1;
              }
            });
            setNavigationButtonClicked(true);
          }}
        >
          &larr;&nbsp;Previous
        </button>
        <button
          onClick={() => {
            setCurrentPersonalWindow((prev: number) => {
              if (prev === 6) {
                console.log(answersArray);
                return prev;
              } else {
                return prev + 1;
              }
            });
            setNavigationButtonClicked(true);
          }}
        >
          Next&nbsp;&rarr;
        </button>

        {currentPersonalWindow === 6 &&
          (isLoading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            <button
              onClick={() => {
                getLearningPlan();
              }}
            >
              Generate plan
            </button>
          ))}
      </div>
    </motion.div>
  );
}
