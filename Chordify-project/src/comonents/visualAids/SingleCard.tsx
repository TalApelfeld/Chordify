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
    <div className="mb-10 ml-7 mt-12 overflow-hidden rounded-lg bg-background-test-modal shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3 xl:w-60 2xl:w-72 ">
      <img src={image} alt="" className="w-full" />
      <div className="p-8 text-center ">
        <h3>
          <button
            className="mb-4 block text-xl font-semibold text-dark hover:text-gray-500 dark:text-black "
            onClick={() => {
              handleMusic(CardTitle);
            }}
          >
            {CardTitle}
          </button>
        </h3>

        <div className="mb-7 text-base leading-relaxed text-body-color dark:text-black">
          {children}
        </div>
      </div>
    </div>
  );
}
