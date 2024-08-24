import PieChart from "./PieChart";

interface middleContentProps {
  timeGreeting: string;
  checkedCount: number;
  totalCheckboxes: number;
}

export default function MiddleContent({
  timeGreeting,
  checkedCount,
  totalCheckboxes,
}: middleContentProps) {
  return (
    <>
      <div className="  bg-background-black text-text-homepage   ;">
        <h1 className="text-5xl font-extrabold mb-middleContent-big-space pt-8 ml-10">
          {timeGreeting}
        </h1>

        <p className="text-2xl mb-3.5 ml-11">Personolized plan</p>

        {/*  //* Your progress */}
        <div className="your-progress-container mb-8 1xl:mb-16">
          <h2 className="font-bold mb-middleContent-small-space ml-12">
            your progress
          </h2>
          {/* //* Images container */}

          <PieChart
            checkedCount={checkedCount}
            totalCheckboxes={totalCheckboxes}
          />
        </div>

        <div className="divider mb-middleContent-big-space "></div>

        <div className="skill-assesment-container border-solid border-2 rounded-3xl border-gray-600 mb-middleContent-big-space border-opacity-40 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 justify-self-end mr-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
            />
          </svg>
          <p className="justify-self-start text-2xl font-bold">
            Skill Assesment
          </p>
          <p className="test-knoledge justify-self-start text-lg self-start">
            Test your knoledge now!
          </p>
          <button className="test-button bg-background-grey rounded-2xl py-3 px-6 self-end font-semibold">
            Begin quiz
          </button>
        </div>

        <h2 className="font-bold mb-middleContent-small-space ml-10 ">
          Today's Practice
        </h2>

        <div className="skill-assesment-container border-solid border-2 rounded-3xl border-gray-600 mb-middleContent-big-space border-opacity-40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 justify-self-end mr-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
            />
          </svg>

          <p className="justify-self-start text-2xl font-bold ">
            Guitar Basics
          </p>
          <p className="test-knoledge justify-self-start text-lg self-start">
            Essential chords for begginers
          </p>
          <button className="test-button bg-background-grey rounded-2xl py-3 px-6 self-end font-semibold">
            Start learning
          </button>
        </div>
      </div>
    </>
  );
}
