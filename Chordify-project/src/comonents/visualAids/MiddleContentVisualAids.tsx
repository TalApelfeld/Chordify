import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";

interface Chord {
  name: string;
  url: string;
  bulletPoints: string[];
}

export default function MiddleContentVisualAids() {
  const [chords, setChords] = useState<Chord[]>([]);

  useEffect(() => {
    async function getChords() {
      const res = await fetch("http://127.0.0.1:3000/visualaids");
      const data = await res.json();
      setChords(data);
      console.log(data);
    }
    getChords();
  }, []);
  return (
    <div className="bg-background-black text-white">
      <div className="grid gap-8  grid-cols-3">
        {chords.map((chord) => (
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
