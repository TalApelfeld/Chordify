import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";

interface Chord {
  name: string;
  url: string;
  bulletPoints: string[];
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default function MiddleContentVisualAids() {
  const [chords, setChords] = useState<Chord[] | null>(null);

  useEffect(() => {
    async function getChords() {
      const res = await fetch(`${serverUrl}/visualaids`);
      const data = await res.json();
      setChords(data.data);
      console.log(data);
    }
    getChords();
  }, []);
  return (
    <div className="bg-background-black ">
      <div className="grid 2xl:gap-8 xl:gap-2 grid-cols-3">
        {chords?.map((chord) => (
          <SingleCard image={chord.url} CardTitle={chord.name}>
            <ul>
              {chord.bulletPoints.map((bullet) => (
                <li className="list-disc pl-3">{bullet}</li>
              ))}
            </ul>
          </SingleCard>
        ))}
      </div>
    </div>
  );
}
