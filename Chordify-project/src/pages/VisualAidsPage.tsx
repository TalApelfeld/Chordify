import styles from "./Homepage.module.css";
import MiddleContentVisualAids from "../comonents/visualAids/MiddleContentVisualAids";
import { ILearningPlan } from "./HomePage";
import { useEffect, useState } from "react";
import SideBarLeft from "../comonents/homePage/SideBarLeft";
import SideBarDesktop from "../comonents/homePage/SideBarDesktop";
import WeeklyPlan from "../comonents/homePage/WeeklyPlan";

const serverURL = import.meta.env.VITE_SERVER_URL;

// let serverURL = "";
// let toURLPage = "";

// if (window.location.href === "http://localhost:5173/visualaids") {
//   serverURL = "http://localhost:3000";
//   toURLPage = "http://localhost:5173/home";
// }
// if (window.location.href === "http://10.0.0.16:5173/visualaids") {
//   serverURL = "http://10.0.0.16:3000";
//   toURLPage = "http://10.0.0.16:5173/home";
// }
// if (window.location.href === "https://chordify.onrender.com/visualaids") {
//   serverURL = "https://chordify-api.onrender.com";
//   toURLPage = "https://chordify.onrender.com/home";
// }

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
      window.location.href = toURLPage;
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
