import styles from "./Homepage.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import NewCardSong from "../comonents/songLibrary/NewCardSong";
import SideBarLeft from "../comonents/homePage/SideBarLeft";
import { ILearningPlan } from "./HomePage";
import WeeklyPlan from "../comonents/homePage/WeeklyPlan";
import SideBarDesktop from "../comonents/homePage/SideBarDesktop";

const serverURL = import.meta.env.VITE_SERVER_URL;
const goToURL = import.meta.env.VITE_GO_TO;

export interface IChord {
  [key: string]: string;
}

export interface ILyricLine {
  chords: string[];
  text: string;
}

export interface ISection {
  type: string;
  chords?: string[];
  lyrics?: ILyricLine[];
}

export interface ISong {
  title: string;
  artist: string;
  chords: IChord;
  strumming_pattern: string[];
  sections: ISection[];
}

export default function SongLibraryPage() {
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [menuButtonClicked, setMenuButtonClicked] = useState(false);
  const [searchedBtnClicked, setSearchedBtnClicked] = useState(false);
  const [begginerBtnClicked, setBegginerBtnClicked] = useState(true);
  const [begginerSongsList, setBegginerSongsList] = useState<ISong[] | null>(
    null
  );
  const [userSearchedSongList, setUserSearchedSongList] = useState<
    ISong[] | null
  >(null);
  const [learningPlan, setLearningPlan] = useState<ILearningPlan[] | null>(
    null
  );
  const [showWeeklyPlan, setShowWeeklyPlan] = useState(false);
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

  async function getBegginerSongsFromDB() {
    const res = await fetch(`${serverURL}/songs/begginer`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    setBegginerSongsList(data);
    console.log(data);
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setBegginerBtnClicked(false);
    setSearchedBtnClicked(true);

    try {
      const res = await fetch(`${serverURL}/songs/newSearch`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: inputValue }),
        credentials: "include",
      });

      const data = await res.json();
      setUserSearchedSongList(data.data);
      setBegginerBtnClicked(false);
      setSearchedBtnClicked(true);

      if (data.data) {
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInputValue("");
      setLoading(false);
    }
  }

  async function getSearchedSongsFromDB() {
    setLoading(true);
    try {
      const res = await fetch(`${serverURL}/songs/searched`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      setUserSearchedSongList(data.data);

      // if (data) {
      //   console.log(data);
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPlanFromDB();
    getBegginerSongsFromDB();
  }, []);

  return (
    <div className={`${styles.homepageContainer} `}>
      <SideBarDesktop
        menuButtonClicked={menuButtonClicked}
        setMenuButtonClicked={setMenuButtonClicked}
        setShowWeeklyPlan={setShowWeeklyPlan}
      />
      <SideBarLeft
        menuButtonClicked={menuButtonClicked}
        setMenuButtonClicked={setMenuButtonClicked}
        setShowWeeklyPlan={setShowWeeklyPlan}
      />
      <div className="songLibrary-container">
        <button
          className={`menu-button-songlibrary ${
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
        <form onSubmit={handleFormSubmit}>
          <div className="input-container">
            <input
              type="search"
              value={inputValue}
              placeholder="Serach for chords..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setInputValue(e.target.value);
              }}
            />
          </div>
        </form>

        <div className="category-container">
          <button
            className={`searched-btn`}
            onClick={() => {
              setBegginerBtnClicked(false);
              setSearchedBtnClicked(true);
              getSearchedSongsFromDB();
            }}
          >
            Searched songs
          </button>
          <button
            className={`beginner-btn`}
            onClick={() => {
              setSearchedBtnClicked(false);
              setBegginerBtnClicked(true);
            }}
          >
            Begginer songs
          </button>
        </div>

        {searchedBtnClicked && !loading ? (
          <div className="beginnerSongs-container">
            {userSearchedSongList?.map((songObj: ISong, index: number) => (
              <NewCardSong key={index} songData={songObj} />
            ))}
          </div>
        ) : searchedBtnClicked && loading ? (
          <div className="spinner-skill-container">
            <span className="loader-skill"></span>
          </div>
        ) : (
          ""
        )}

        {begginerBtnClicked && (
          <div className="beginnerSongs-container">
            {begginerSongsList?.map((songObj: ISong, index: number) => (
              <NewCardSong key={index} songData={songObj} />
            ))}
          </div>
        )}

        {showWeeklyPlan && (
          <WeeklyPlan
            learningPlan={learningPlan}
            setShowWeeklyPlan={setShowWeeklyPlan}
            setCheckedCount={setCheckedCount}
          />
        )}
      </div>
    </div>
  );
}
