import ButtonPersonal from "./ButtonPersonal";

interface PersonalTestProps {
  handleModalClose: () => void;
  handleNextQuestion: () => void;
  onSetCurAnswer: (answer: string) => void;

  question: { number: number; name: string; options: string[] };
}

export default function PersonalTestModal({
  handleModalClose,
  question,
  handleNextQuestion,
  onSetCurAnswer,
}: PersonalTestProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-background-test-modal p-5 rounded-lg max-w-4xl w-full m-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{question.name}</h2>
          <button className="text-black" onClick={handleModalClose}>
            <span className="text-2xl">&times;</span> {/* Close icon */}
          </button>
        </div>

        <div className="mt-4">
          <ul>
            {question.options.map((option: string, index: number) => (
              <ButtonPersonal
                key={index}
                option={option}
                onSetCurAnswer={onSetCurAnswer}
              />
            ))}
          </ul>
        </div>

        <div className="mt-4 flex justify-end">
          {/* <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleModalClose}
          >
            Close
          </button> */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleNextQuestion()}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}
