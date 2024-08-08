interface WeeklyPlanProps {
  handleModalClose: () => void;
  learningPlanHome: { h1: string; h2: string[]; li: string[] };
}

export default function WeeklyPlan({
  learningPlanHome,
  handleModalClose,
}: WeeklyPlanProps) {
  const chunkArray = (arr: string[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const assignmentsPerDay = chunkArray(learningPlanHome.li, 4);
  if (assignmentsPerDay) console.log(assignmentsPerDay);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-background-test-modal p-5 rounded-lg max-w-4xl w-full m-4 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-center text-gray-900 mt-8 mb-6">
            Your learning plan:
          </h1>
          <button className="text-black" onClick={handleModalClose}>
            <span className="text-2xl">&times;</span> {/* Close icon */}
          </button>
        </div>
        <div className="overflow-auto flex-grow">
          <h1 className="text-3xl font-bold text-center text-gray-900 mt-8 mb-6">
            {learningPlanHome.h1}
          </h1>

          {learningPlanHome.h2.map((day, index) => (
            <div className="space-y-8" key={index}>
              <div className="bg-white shadow rounded-lg p-6 mb-4">
                <h2 className="text-2xl font-bold text-purple-600">{day}</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {assignmentsPerDay[index]?.map((assignment, index) => (
                    <li className="flex items-center" key={index}>
                      <input
                        id={`day${index}-task${index}`}
                        className="h-5 w-5 mr-2"
                        type="checkbox"
                      />
                      <label
                        htmlFor={`day${index}-task${index}`}
                        className="flex-1"
                      >
                        {assignment}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
            onClick={handleModalClose}
          >
            Close
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get your Next plan
          </button>
        </div>
      </div>
    </div>
  );
}
