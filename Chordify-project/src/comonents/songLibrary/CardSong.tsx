// import { useEffect, useState } from "react";

// interface Props {
//   title: string | null;
//   chordsUsed: string[]; // An array of strings
//   chordProgression: string[][]; // An array of arrays of strings;
//   strummingPattern: string[];
// }

// export default function CardSong({
//   title,
//   chordsUsed,
//   chordProgression,
//   strummingPattern,
// }: Props) {
//   const [isPlaying, setIsPlaying] = useState(false);

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const playSound = async (note: string) => {
//     switch (note) {
//       case "D": {
//         const downAudio = new Audio(`/assets/down-stroke.mp3`);
//         downAudio.playbackRate = 2.0;
//         console.log("DOWN");
//         await downAudio.play();
//         await new Promise((resolve) => setTimeout(resolve, 800)); // Delay to show the color change
//         break;
//       }

//       case "U": {
//         const upAudio = new Audio(`/assets/up-stroke.mp3`);
//         upAudio.playbackRate = 4.0;
//         console.log("UP");
//         await upAudio.play();
//         await new Promise((resolve) => setTimeout(resolve, 800)); // Delay to show the color change
//         break;
//       }

//       case "-":
//         await new Promise((resolve) => setTimeout(resolve, 800)); // Delay to show the color change
//         break;
//     }
//   };

//   useEffect(() => {
//     let active = true; // Flag to control the loop based on the effect's lifecycle

//     const playSequence = async () => {
//       while (isPlaying && active) {
//         // Check both isPlaying and active to ensure robust control
//         for (const chord of strummingPattern) {
//           if (!isPlaying || !active) break; // Check again before playing each sound
//           await playSound(chord);
//         }
//       }
//       console.log("Sequence finished or stopped");
//     };

//     if (isPlaying) {
//       playSequence();
//     }

//     return () => {
//       active = false; // Set active to false to stop the sequence when the effect cleans up
//       console.log("Cleanup called");
//     };
//   }, [isPlaying, strummingPattern]); // Dependency array ensures effect runs only when isPlaying changes

//   return (
//     <div className=" mt-20 ml-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//       <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//         {title}
//       </h1>

//       <div>
//         <h2 className="text-slate-100">chords used:</h2>
//         <ul className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//           {chordsUsed.map((chord, index) => (
//             <li key={index}>* {chord}</li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2 className="text-slate-100">chord Progression:</h2>
//         <ul className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
//           {chordProgression.map((chordSet, index) => (
//             <li key={index}>
//               {chordSet.map((chord, index) =>
//                 index !== chordSet.length - 1 ? `${chord} -> ` : `${chord} `
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="flex">{strummingPattern.toString()}</div>

//       <a
//         onClick={togglePlay}
//         className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//       >
//         {isPlaying ? "Stop Strumming" : "Start Strumming"}
//         <svg
//           className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
//           aria-hidden="true"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 14 10"
//         >
//           <path
//             stroke="currentColor"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M1 5h12m0 0L9 1m4 4L9 9"
//           />
//         </svg>
//       </a>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

interface Props {
  title: string | null;
  chordsUsed: string[];
  chordProgression: string[][];
  strummingPattern: string[];
}

export default function CardSong({
  title,
  chordsUsed,
  chordProgression,
  strummingPattern,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStrum, setCurrentStrum] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCurrentStrum(0); // Reset to the beginning when starting
    }
  };

  const playSound = async (note: string, index: number) => {
    setCurrentStrum(index); // Update the current strum index
    switch (note) {
      case "D":
        const downAudio = new Audio(`/assets/down-stroke.mp3`);
        downAudio.playbackRate = 2.0;
        await downAudio.play();
        await new Promise((resolve) => setTimeout(resolve, 800));
        break;
      case "U":
        const upAudio = new Audio(`/assets/up-stroke.mp3`);
        upAudio.playbackRate = 4.0;
        await upAudio.play();
        await new Promise((resolve) => setTimeout(resolve, 800));
        break;
      case "-":
        await new Promise((resolve) => setTimeout(resolve, 800));
        break;
    }
  };

  useEffect(() => {
    let active = true;

    const playSequence = async () => {
      while (isPlaying && active) {
        for (let i = 0; i < strummingPattern.length; i++) {
          if (!isPlaying || !active) break;
          await playSound(strummingPattern[i], i);
        }
        setCurrentStrum(0); // Reset strum index for continuous loop
      }
      console.log("Sequence finished or stopped");
    };

    if (isPlaying) {
      playSequence();
    }

    return () => {
      active = false;
      console.log("Cleanup called");
    };
  }, [isPlaying, strummingPattern]);

  return (
    <div className="mt-20 ml-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h1>

      <div>
        <h2 className="text-slate-100">chords used:</h2>
        <ul className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {chordsUsed.map((chord, index) => (
            <li key={index}>* {chord}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-slate-100">chord Progression:</h2>
        <ul className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
          {chordProgression.map((chordSet, index) => (
            <li key={index}>
              {chordSet.map((chord, index) =>
                index !== chordSet.length - 1 ? `${chord} -> ` : `${chord} `
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex mb-5">{strummingPattern.toString()}</div>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(20px,_1fr))] gap-1">
        {strummingPattern.map((strum, index) => (
          <div
            key={index}
            className={`p-2 ${
              index === currentStrum ? "bg-blue-500" : "bg-gray-200"
            } rounded`}
          >
            {strum === "D" ? "↓" : strum === "U" ? "↑" : "-"}
          </div>
        ))}
      </div>

      <a
        onClick={togglePlay}
        className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isPlaying ? "Stop Strumming" : "Start Strumming"}
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
}
