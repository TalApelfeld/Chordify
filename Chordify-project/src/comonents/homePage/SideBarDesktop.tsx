import { Dispatch, SetStateAction } from "react";

interface SideBarLeftProps {
  menuButtonClicked: boolean;
  setMenuButtonClicked: Dispatch<SetStateAction<boolean>>;
  setShowWeeklyPlan: Dispatch<SetStateAction<boolean>>;
  mobileUI?: boolean;
}

const serverURL = import.meta.env.VITE_SERVER_URL;

// let serverURL: string = "";
// let loginURLPage = "";

// if (window.location.host === "localhost:5173") {
//   serverURL = "http://localhost:3000";
//   loginURLPage = "http://localhost:5173/login";
// }

// if (window.location.host === "10.0.0.16:5173") {
//   serverURL = "http://10.0.0.16:3000";
//   loginURLPage = "http://10.0.0.16:5173/login";
// }
// if (window.location.host === "chordify.onrender.com") {
//   serverURL = "https://chordify-api.onrender.com";
//   loginURLPage = "https://chordify.onrender.com/login";
// }
// console.log(serverURL);

export default function SideBarDesktop({
  menuButtonClicked,
  setMenuButtonClicked,
  setShowWeeklyPlan,
}: SideBarLeftProps) {
  async function logout() {
    try {
      const response = await fetch(`${serverURL}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the logout");
      }

      window.location.href = "https://chordify.onrender.com/login";
      // const data = await response.json();

      // console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`sidebar-container-desktop`}>
      {/* //* logo container */}
      <div className="top-container">
        <div className="logo-container">
          <svg
            width="50px"
            height="50px"
            version="1.1"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m50 96.57c-21.418 0-41.691-47.469-41.691-65.234 0-16.926 15.586-27.027 41.691-27.027s41.691 10.105 41.691 27.031c0 17.766-20.273 65.23-41.691 65.23zm0-88.414c-35.113 0-37.844 17.742-37.844 23.184 0 17.812 20.199 61.387 37.844 61.387s37.844-43.578 37.844-61.387c0-5.4414-2.7305-23.184-37.844-23.184z"
              // stroke="#374151"
              fill="white"
            />
          </svg>
        </div>
        <span>Chordify</span>
        <button
          className={`${menuButtonClicked ? "menu-button-clicked" : ""}`}
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
      </div>

      {/* //* Buttons container */}
      <div className="buttons-container">
        {/* //* Buttons top contianer */}
        <div className="buttons-top-container ">
          <a href="/home">
            <button className="btn-container home-btn hover:bg-background-black hover:rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width="36px"
                height="36px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                />
              </svg>
              Home
            </button>
          </a>

          <a href="/songlibrary">
            <button className="btn-container hover:bg-background-black hover:rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width="36px"
                height="36px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
                />
              </svg>
              Song library
            </button>
          </a>

          <a href="/visualaids">
            <button className="btn-container hover:bg-background-black hover:rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width="36px"
                height="36px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                />
              </svg>
              Visual aids
            </button>
          </a>

          <button
            className={`btn-container hover:bg-background-black hover:rounded-lg`}
            onClick={() => {
              setMenuButtonClicked(!menuButtonClicked);
              setShowWeeklyPlan(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="36px"
              height="36px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            Weekly Plan
          </button>
        </div>

        {/* //* buttons bottom container */}
        <div className=" buttons-bottom-container">
          <button className="btn-container hover:bg-background-black hover:rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="36px"
              height="36px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Settings
          </button>

          <button
            className="btn-container hover:bg-background-black hover:rounded-lg"
            onClick={() => {
              logout();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="36px"
              height="36px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
