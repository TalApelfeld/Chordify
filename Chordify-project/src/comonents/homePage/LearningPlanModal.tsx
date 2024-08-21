import { useEffect, useState } from "react";

interface LearningPlanModalProps {
  handleModalClose: () => void;
  handleSetPlanHome: (plan: ParsedGptAnswerProps) => void;

  answers: string[];
}

interface ParsedGptAnswerProps {
  h1: string;
  h2: string[];
  li: string[];
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default function LearningPlanModal({
  handleModalClose,
  answers,
  handleSetPlanHome,
}: LearningPlanModalProps) {
  const [parsedGptAnswer, setParsedGptAnswer] = useState({
    h1: "",
    h2: [""],
    li: [""],
  });

  // destructure the answer coming back from chat GPT into object by h1, h2, li
  function parseGuitarPracticeSchedule(plan: string) {
    // Regular expressions to match <h1>, <h2>, and <li> elements
    const h1Regex = /<h1>(.*?)<\/h1>/;
    const h2Regex = /<h2>(.*?)<\/h2>/g;
    const liRegex = /<li>(.*?)<\/li>/g;

    // Extract <h1> content
    const h1Match = plan.match(h1Regex);
    const h1Variable = h1Match ? h1Match[1] : "";

    // Extract <h2> contents
    const h2Matches = [...plan.matchAll(h2Regex)];
    const h2Variables = h2Matches.map((match) => match[1]);

    // Extract <li> contents
    const liMatches = [...plan.matchAll(liRegex)];
    const liArray = liMatches.map((match) => match[1]);

    console.log({ h1: h1Variable, h2: h2Variables, li: liArray });

    // Return the result as an object
    return {
      h1: h1Variable,
      h2: h2Variables,
      li: liArray,
    };
  }

  // send post req to fetch the learning plan
  useEffect(() => {
    async function getLearningPlan(answers: string[]) {
      try {
        const res = await fetch(`${serverUrl}/home/learningplan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers }),
        });

        const data = await res.json();
        console.log(data.message);
        setParsedGptAnswer(parseGuitarPracticeSchedule(data.message));
      } catch (error) {
        console.error(error);
      }
    }

    getLearningPlan(answers);
  }, []); // Empty dependency array indicates this runs only on mount

  // becuse when we set a state it happen in an async way we need to watch for changes on the state , best way is "useEffect"
  useEffect(() => {
    if (parsedGptAnswer.h1) {
      // Checks if there's a valid plan to process
      handleSetPlanHome(parsedGptAnswer);
      const plan = parsedGptAnswer;
      localStorage.setItem("plan", JSON.stringify(plan));
    }
  }, [parsedGptAnswer]); // Depend on parsedGptAnswer to trigger this effect

  // function from GPT to be able to render the answer in the format of 4 "li" in a day
  const chunkArray = (arr: string[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const assignmentsPerDay = chunkArray(parsedGptAnswer.li, 4);
  if (assignmentsPerDay) console.log(assignmentsPerDay);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-background-test-modal p-5 rounded-lg max-w-4xl w-full m-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">Your learning plan:</h1>
          <button className="text-black" onClick={handleModalClose}>
            <span className="text-2xl">&times;</span> {/* Close icon */}
          </button>
        </div>
        <div className="overflow-auto flex-grow">
          <h1>{parsedGptAnswer.h1}</h1>
          {parsedGptAnswer.h2.map((day, index) => (
            <div key={index}>
              <h2>{day}</h2>
              <ul>
                {assignmentsPerDay[index]?.map((assignment, index) => (
                  <li key={index}>{assignment}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleModalClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
