import styles from "./Homepage.module.css";
import MiddleContentVisualAids from "../comonents/visualAids/MiddleContentVisualAids";
import { ILearningPlan } from "./HomePage";
import { useEffect, useState } from "react";
import SideBarLeft from "../comonents/homePage/SideBarLeft";
import SideBarDesktop from "../comonents/homePage/SideBarDesktop";
import WeeklyPlan from "../comonents/homePage/WeeklyPlan";

const serverURL = import.meta.env.VITE_SERVER_URL;
const goToURL = import.meta.env.VITE_GO_TO;

export default function VisualAidsPage() {
  const [menuButtonClicked, setMenuButtonClicked] = useState(false);
  const [showWeeklyPlan, setShowWeeklyPlan] = useState(false);
  const [learningPlan, setLearningPlan] = useState<ILearningPlan[] | null>(
    null
  );
  const [checkedCount, setCheckedCount] = useState(0);
  console.log("checked:", checkedCount);

  async function getPlanFromDB() {
    const res = await fetch(`${serverURL}/home/learningplan`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.plan[0].learningPlan.length === 0) {
      window.location.href = `${goToURL}/home`;
    } else {
      setLearningPlan(data.plan[0].learningPlan);
    }
    console.log(data);
  }

  useEffect(() => {
    getPlanFromDB();
  }, []);

  return (
    <div className={`${styles.homepageContainer}`}>
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

      <MiddleContentVisualAids
        menuButtonClicked={menuButtonClicked}
        setMenuButtonClicked={setMenuButtonClicked}
      />

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
