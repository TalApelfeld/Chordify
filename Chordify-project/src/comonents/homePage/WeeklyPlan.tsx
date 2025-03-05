import { Dispatch, SetStateAction, useState } from "react";
import { ILearningPlan } from "../../pages/HomePage";

interface WeeklyPlanProps {
  learningPlan: ILearningPlan[] | null;
  setShowWeeklyPlan: Dispatch<SetStateAction<boolean>>;
  setCheckedCount: Dispatch<SetStateAction<number>>;
}

export default function WeeklyPlan({
  learningPlan,
  setShowWeeklyPlan,
  setCheckedCount,
}: WeeklyPlanProps) {
  const [checkedGoals, setCheckedGoals] = useState<boolean[]>(
    new Array(
      learningPlan
        ? learningPlan.reduce((acc, week) => acc + week.goals.length, 0)
        : 0
    ).fill(false)
  );
  const [minimizeWindow, setMinimizeWindow] = useState(false);
  const [weekNumberClicked, setWeekNumberClicked] = useState<number | null>(
    null
  );

  const handleCheckboxChange = (index: number) => {
    const newCheckedGoals = [...checkedGoals];
    newCheckedGoals[index] = !newCheckedGoals[index];

    setCheckedGoals(newCheckedGoals);
    setCheckedCount(newCheckedGoals.filter(Boolean).length);
  };

  return (
    <div className="modal-weekly-plan">
      <div
        className="weekly-exit-btn"
        onClick={() => {
          setShowWeeklyPlan(false);
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
      <h1>Your learning plan:</h1>
      <div className="weekly-plan-container">
        {learningPlan?.map((week, weekIndex) => (
          <div className="week-container" key={weekIndex}>
            <div className="weekPlan-head">
              <h1>{week.title}</h1>
              <div
                className="minimize-btn"
                onClick={() => {
                  setWeekNumberClicked(weekIndex);
                  setMinimizeWindow(!minimizeWindow);
                }}
                style={{
                  transform: `${
                    minimizeWindow && weekNumberClicked === weekIndex
                      ? ""
                      : "translate(-50%, 25%) rotate(180deg)"
                  }`,
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
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
            <div
              className="checkboxes-container"
              style={{
                display: `${
                  minimizeWindow && weekNumberClicked === weekIndex
                    ? "none"
                    : "flex"
                }`,
              }}
            >
              {week.goals.map((goal, goalIndex) => {
                const globalIndex = weekIndex * week.goals.length + goalIndex;
                return (
                  <label key={globalIndex}>
                    {globalIndex + 1}.&nbsp;
                    <input
                      type="checkbox"
                      checked={checkedGoals[globalIndex]}
                      onChange={() => handleCheckboxChange(globalIndex)}
                    />
                    &nbsp; {goal}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
