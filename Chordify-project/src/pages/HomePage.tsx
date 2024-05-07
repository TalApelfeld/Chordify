// import Grid from "@mui/material/Grid";
// import Sidebar from "../components/home/Sidebar";
// import HomeContent from "../components/home/HomeContent";
// import TopSearches from "../components/home/TopSearches";
import styles from "../comonents/homePage/gridContainer.module.css";
import MiddleContent from "../comonents/homePage/MiddleContent";
import SideBarLeft from "../comonents/homePage/SideBarLeft";
import RightContent from "../comonents/homePage/RightContent";
import { useEffect, useState } from "react";

export default function Home() {
  const [timeGreeting, setTimeGreeting] = useState("");

  useEffect(() => {
    const getTime = async function () {
      const now: Date = new Date();
      const hour: number = now.getHours();

      if (hour < 12) {
        setTimeGreeting("Good morning, Tal");
      } else if (hour >= 12 && hour <= 17) {
        setTimeGreeting("Good afternoon, Tal");
      } else {
        setTimeGreeting("Good evening, Tal");
      }
    };
    getTime();
  }, []);
  return (
    <div className={`${styles.grid}`}>
      <SideBarLeft />

      <MiddleContent timeGreeting={timeGreeting} />
      <RightContent />
    </div>
  );
}
