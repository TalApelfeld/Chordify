interface SingleCardProps {
  image: string;

  CardTitle: string;

  children: React.ReactNode;
}

export default function SingleCard({
  image,
  children,
  CardTitle,
}: SingleCardProps) {
  function handleMusic(chord: string) {
    switch (chord) {
      case "C Major (C)": {
        const audio = new Audio(
          `../../assets/guitar/C_AcousticGuitar_RodrigoMercador_1.mp3`
        );
        audio.play();
        break;
      }
      case "G Major (G)": {
        const audio = new Audio(
          `../../assets/guitar/G_AcousticGuitar_RodrigoMercador_1.mp3`
        );
        audio.play();
        break;
      }
      case "E Minor (Em)": {
        const audio = new Audio(
          `../../assets/guitar/Em_AcousticGuitar_RodrigoMercador_1.mp3`
        );
        audio.play();
        break;
      }

      case "A Minor (Am)": {
        const audio = new Audio(
          `../../assets/guitar/Am_AcousticGuitar_RodrigoMercador_1.mp3`
        );
        audio.play();
        break;
      }

      case "D Minor (Dm)": {
        const audio = new Audio(
          `../../assets/guitar/Dm_AcousticGuitar_RodrigoMercador_1.mp3`
        );
        audio.play();
        break;
      }
      default:
        break;
    }
  }

  return (
    <div className="chord-card  bg-background-test-modal shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3  ">
      <img src={image} alt="" className="w-full" />
      <div className="p-8 text-center ">
        <h3 className="flex gap-4 justify-center ">
          <button
            className="mb-4 text-xl font-semibold text-dark hover:text-gray-500 dark:text-black "
            onClick={() => {
              handleMusic(CardTitle);
            }}
          >
            {CardTitle}
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            width="18px"
            height="18px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
            />
          </svg>
        </h3>

        <div className=" text-base leading-relaxed text-body-color dark:text-black">
          {children}
        </div>
      </div>
    </div>
  );
}
