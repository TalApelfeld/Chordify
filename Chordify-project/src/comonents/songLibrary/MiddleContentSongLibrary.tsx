import { useEffect, useState } from "react";
import CardSong from "./CardSong";

interface SongObjProps {
  title: string;
  chordsUsed: string[]; // An array of strings
  chordProgression: string[][]; // An array of arrays of strings;
  strummingPattern: string[];
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default function MiddleContentSongLibrary() {
  const [searchInputValue, setSearchInputValue] = useState<string | undefined>(
    ""
  );
  // const [songObj, setSongObj] = useState<SongObjProps | null>(null);

  const [searchedSongObjArray, setSearchedSongObjArray] = useState<
    SongObjProps[] | null
  >(null);

  const [begginerSongObjArray, setBegginerSongObjArray] = useState<
    SongObjProps[] | null
  >(null);

  const [songCategory, setSongCategory] = useState<string>("begginer");

  async function fetchNewSong(value: string) {
    if (!value) return;
    try {
      const response = await fetch(`${serverUrl}/songs`, {
        // Adjust the API endpoint as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies with the request
        body: JSON.stringify({ value }),
      });

      const data = await response.json();
      setSearchedSongObjArray((prev) => [...(prev || []), data.songObj]);

      setSearchInputValue("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSearchedSongs() {
    try {
      const response = await fetch(`${serverUrl}/songs/searched`, {
        // Adjust the API endpoint as needed
        method: "GET",
        credentials: "include", // Include cookies with the request
      });

      const data = await response.json();
      setSearchedSongObjArray(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getBegginerSongs() {
    try {
      const response = await fetch(`${serverUrl}/songs/begginer`, {
        // Adjust the API endpoint as needed
        method: "GET",
        credentials: "include", // Include cookies with the request
      });

      const data = await response.json();

      if (data && data.data) {
        setBegginerSongObjArray(data.data);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (songCategory === "searched") getSearchedSongs();
    if (songCategory === "begginer") getBegginerSongs();
  }, [songCategory]);

  return (
    <div className="bg-background-black text-white relative">
      <div className="relative flex gap-2 mt-5">
        <input
          type="text"
          className="mx-auto  m-0 -me-0.5 block  rounded-s border border-solid border-neutral-200 bg-background-test-modal bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary"
          placeholder="Search for song"
          aria-label="Search"
          id="exampleFormControlInput3"
          aria-describedby="button-addon3"
          value={searchInputValue}
          onChange={(e) => {
            setSearchInputValue(e.target.value);
          }}
        />
        <button
          className="z-[2] inline-block rounded-e border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950"
          onClick={() => {
            if (searchInputValue) fetchNewSong(searchInputValue);
          }}
        >
          Search
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 ">
        <div className="inline-flex rounded-md shadow-sm " role="group">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => setSongCategory("begginer")}
          >
            begginer songs
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => setSongCategory("searched")}
          >
            Searched songs
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => setSongCategory("messages")}
          >
            Messages
          </button>
        </div>
      </div>

      {songCategory === "begginer" && (
        <div className="scrollable-hidden-scrollbar">
          <div className="flex flex-wrap gap-3 w-full">
            {Array.isArray(begginerSongObjArray) &&
              begginerSongObjArray.map((song, index) => (
                <div className="flex-1 flex-shrink-0 basis-1/4" key={index}>
                  <CardSong
                    title={song.title}
                    chordsUsed={song.chordsUsed}
                    chordProgression={song.chordProgression}
                    strummingPattern={song.strummingPattern}
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {songCategory === "searched" && (
        <div className="scrollable-hidden-scrollbar">
          <div className="flex flex-wrap gap-3 w-full">
            {Array.isArray(searchedSongObjArray) &&
              searchedSongObjArray?.map((song, index) => (
                <div className="flex-1 flex-shrink-0 basis-1/4" key={index}>
                  <CardSong
                    title={song.title}
                    chordsUsed={song.chordsUsed}
                    chordProgression={song.chordProgression}
                    strummingPattern={song.strummingPattern}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
