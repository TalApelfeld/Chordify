import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface PieChartProps {
  checkedCount: number;
  totalCheckboxes: number;
}

export default function PieChart({
  checkedCount,
  totalCheckboxes,
}: PieChartProps) {
  const data = {
    labels: ["Checked", "Unchecked"],
    datasets: [
      {
        data: [checkedCount, totalCheckboxes - checkedCount],
        backgroundColor: ["#4caf50", "#f44336"],
        hoverBackgroundColor: ["#66bb6a", "#e57373"],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (context: { dataIndex: number }) => {
          if (context.dataIndex === 0) {
            // Show the count of checked checkboxes
            return `${checkedCount} / ${totalCheckboxes}`;
          } else {
            return null; // No label for the unchecked slice
          }
        },
        color: "#fff",
        font: {
          weight: 700,
          size: 16,
        },
      },
    },
  };
  return (
    <div className="w-36">
      <Pie data={data} options={options} />
    </div>
  );
}
