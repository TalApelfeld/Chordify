import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SingleCard from "./SingleCard";

interface IMiddleContentVisualAids {
  menuButtonClicked: boolean;
  setMenuButtonClicked: Dispatch<SetStateAction<boolean>>;
}

interface Chord {
  name: string;
  url: string;
  bulletPoints: string[];
}
const serverURL = import.meta.env.VITE_SERVER_URL;

export default function MiddleContentVisualAids({
  menuButtonClicked,
  setMenuButtonClicked,
}: IMiddleContentVisualAids) {
  const [chords, setChords] = useState<Chord[] | null>(null);

  useEffect(() => {
    async function getChords() {
      const res = await fetch(`${serverURL}/visualaids`);
      const data = await res.json();
      setChords(data.data);
      console.log(data);
    }

    getChords();
  }, []);
  return (
    <div className="visualaids-container  scrollable-hidden-scrollbar">
      <h1>
        <button
          className={`menu-button-visualaids ${
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
        Visual Aids:
      </h1>

      <div className="chords-container">
        <div className="chords-grid">
          {chords?.map((chord, chordIndex) => (
            <SingleCard
              image={chord.url}
              CardTitle={chord.name}
              key={chordIndex}
            >
              <ul>
                {chord.bulletPoints.map((bullet, bulletIndex) => (
                  <li className="list-disc pl-3" key={bulletIndex}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </SingleCard>
          ))}
        </div>
      </div>
    </div>
  );
}
