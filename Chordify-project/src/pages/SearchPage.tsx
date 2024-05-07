import styles from "../comonents/homePage/gridContainer.module.css";
import MiddleContentSearch from "../comonents/search/MiddleContentSearch";
import SideBarLeftSearch from "../comonents/search/SideBarLeftSearch";
import RightContentSearch from "../comonents/search/RightContentSearch";

export default function SearchPage() {
  return (
    <div className={`${styles.grid}`}>
      <SideBarLeftSearch />

      <MiddleContentSearch />
      <RightContentSearch />
    </div>
  );
}
