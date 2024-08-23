// interface WeeklyPlanProps {
//   handleModalClose: () => void;
//   learningPlanHome: { h1: string; h2: string[]; li: string[] };
// }

// export default function WeeklyPlan({
//   learningPlanHome,
//   handleModalClose,
// }: WeeklyPlanProps) {
//   const chunkArray = (arr: string[], chunkSize: number) => {
//     const result = [];
//     for (let i = 0; i < arr.length; i += chunkSize) {
//       result.push(arr.slice(i, i + chunkSize));
//     }
//     return result;
//   };

//   const assignmentsPerDay = chunkArray(learningPlanHome.li, 4);
//   if (assignmentsPerDay) console.log(assignmentsPerDay);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//       <div className="bg-background-test-modal p-5 rounded-lg max-w-4xl w-full m-4 max-h-[90vh] flex flex-col">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-center text-gray-900 mt-8 mb-6">
//             Your learning plan:
//           </h1>
//           <button className="text-black" onClick={handleModalClose}>
//             <span className="text-2xl">&times;</span> {/* Close icon */}
//           </button>
//         </div>
//         <div className="overflow-auto flex-grow">
//           <h1 className="text-3xl font-bold text-center text-gray-900 mt-8 mb-6">
//             {learningPlanHome.h1}
//           </h1>

//           {learningPlanHome.h2.map((day, index) => (
//             <div className="space-y-8" key={index}>
//               <div className="bg-white shadow rounded-lg p-6 mb-4">
//                 <h2 className="text-2xl font-bold text-purple-600">{day}</h2>
//                 <ul className="list-disc list-inside text-gray-700">
//                   {assignmentsPerDay[index]?.map((assignment, index) => (
//                     <li className="flex items-center" key={index}>
//                       <input
//                         id={`day${index}-task${index}`}
//                         className="h-5 w-5 mr-2"
//                         type="checkbox"
//                       />
//                       <label
//                         htmlFor={`day${index}-task${index}`}
//                         className="flex-1"
//                       >
//                         {assignment}
//                       </label>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-end">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
//             onClick={handleModalClose}
//           >
//             Close
//           </button>
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Get your Next plan
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// // ChartJS.register(ArcElement, Tooltip, Legend);

// interface WeeklyPlanProps {
//   handleModalClose: () => void;
//   learningPlanHome: { h1: string; h2: string[]; li: string[] };
// }

// export default function WeeklyPlan({
//   learningPlanHome,
//   handleModalClose,
// }: WeeklyPlanProps) {
//   const chunkArray = (arr: string[], chunkSize: number) => {
//     const result = [];
//     for (let i = 0; i < arr.length; i += chunkSize) {
//       result.push(arr.slice(i, i + chunkSize));
//     }
//     return result;
//   };
//   console.log(learningPlanHome.li);

//   const assignmentsPerDay = chunkArray(learningPlanHome.li, 5);
//   console.log(assignmentsPerDay);

//   const [checkedState, setCheckedState] = useState(
//     assignmentsPerDay.map((dayAssignments) => dayAssignments.map(() => false))
//   );

//   const handleCheckboxChange = (dayIndex: number, taskIndex: number) => {
//     const updatedCheckedState = [...checkedState];
//     updatedCheckedState[dayIndex][taskIndex] =
//       !updatedCheckedState[dayIndex][taskIndex];
//     setCheckedState(updatedCheckedState);
//   };

//   const calculateCheckedPercentage = () => {
//     let checkedCheckboxes = 0;

//     checkedState.forEach((day) => {
//       day.forEach((isChecked) => {
//         if (isChecked) {
//           checkedCheckboxes += 1;
//         }
//       });
//     });

//     return checkedCheckboxes;
//   };

//   const checkedPercentage = calculateCheckedPercentage();

//   const totalCheckboxes = learningPlanHome.li.length;

//   const data = {
//     labels: ["Checked", "Unchecked"],
//     datasets: [
//       {
//         data: [checkedPercentage, totalCheckboxes - checkedPercentage],
//         backgroundColor: ["#4caf50", "#f44336"],
//         hoverBackgroundColor: ["#66bb6a", "#e57373"],
//       },
//     ],
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//       <div className="bg-background-test-modal p-5 rounded-lg max-w-4xl w-full m-4 max-h-[90vh] flex flex-col">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-center text-gray-900 mt-8 mb-6">
//             Your learning plan:
//           </h1>
//           <button className="text-black" onClick={handleModalClose}>
//             <span className="text-2xl">&times;</span> {/* Close icon */}
//           </button>
//         </div>
//         <div className="overflow-auto flex-grow">
//           <h1 className="text-3xl font-bold text-center text-gray-900 mt-8 mb-6">
//             {learningPlanHome.h1}
//           </h1>

//           {learningPlanHome.h2.map((day, dayIndex) => (
//             <div className="space-y-8" key={dayIndex}>
//               <div className="bg-white shadow rounded-lg p-6 mb-4">
//                 <h2 className="text-2xl font-bold text-purple-600">{day}</h2>
//                 <ul className="list-disc list-inside text-gray-700">
//                   {assignmentsPerDay[dayIndex]?.map((assignment, taskIndex) => (
//                     <li className="flex items-center" key={taskIndex}>
//                       <input
//                         id={`day${dayIndex}-task${taskIndex}`}
//                         className="h-5 w-5 mr-2"
//                         type="checkbox"
//                         checked={checkedState[dayIndex][taskIndex]}
//                         onChange={() =>
//                           handleCheckboxChange(dayIndex, taskIndex)
//                         }
//                       />
//                       <label
//                         htmlFor={`day${dayIndex}-task${taskIndex}`}
//                         className="flex-1"
//                       >
//                         {assignment}
//                       </label>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 flex justify-end">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
//             onClick={handleModalClose}
//           >
//             Close
//           </button>
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Get your Next plan
//           </button>
//         </div>
//         <div className="mt-4 w-44">
//           <Pie data={data} />
//         </div>
//       </div>
//     </div>
//   );
// }

interface WeeklyPlanProps {
  handleModalClose: () => void;
  learningPlanHome: { h1: string; h2: string[]; li: string[] };
  handleCheckboxChange: (dayIndex: number, taskIndex: number) => void;
  assignmentsPerDay: string[][];
  checkedState: boolean[][];
}

export default function WeeklyPlan({
  learningPlanHome,
  handleModalClose,
  handleCheckboxChange,
  assignmentsPerDay,
  checkedState,
}: WeeklyPlanProps) {
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

          {learningPlanHome.h2.map((day, dayIndex) => (
            <div className="space-y-8" key={dayIndex}>
              <div className="bg-white shadow rounded-lg p-6 mb-4">
                <h2 className="text-2xl font-bold text-purple-600">{day}</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {assignmentsPerDay[dayIndex]?.map((assignment, taskIndex) => (
                    <li className="flex items-center" key={taskIndex}>
                      <input
                        id={`day${dayIndex}-task${taskIndex}`}
                        className="h-5 w-5 mr-2"
                        type="checkbox"
                        checked={checkedState[dayIndex][taskIndex]}
                        onChange={() =>
                          handleCheckboxChange(dayIndex, taskIndex)
                        }
                      />
                      <label
                        htmlFor={`day${dayIndex}-task${taskIndex}`}
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
