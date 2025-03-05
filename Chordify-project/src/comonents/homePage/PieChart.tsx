import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  checkedCount: number;
  totalCheckboxes: number;
}

export default function PieChart({
  checkedCount,
  totalCheckboxes,
}: PieChartProps) {
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [checkedCount, totalCheckboxes - checkedCount],
        backgroundColor: ["#4caf50", "#f44336"],
        hoverBackgroundColor: ["#66bb6a", "#e57373"],
      },
    ],
  };

  return (
    <div className="chart-container">
      <Pie data={data} />
    </div>
  );
}
