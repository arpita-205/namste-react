import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { nodeData, reactData } from "./TimeSheet";
import { useParams, useSearchParams } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TimeSheetStats = () => {
  const { taskId, courseType } = useParams();
  const extractSubTasksForObject = (data) => {
    const selectedObject = data.find((item) => item.id === taskId?.toString());

    let tasks = [];
    const extractSubTasks = (subTasks) => {
      subTasks.forEach((sub) => {
        if (sub.subTasks && sub.subTasks.length > 0) {
          extractSubTasks(sub.subTasks);
        } else {
          tasks.push(sub.task);
        }
      });
    };

    if (selectedObject.subTasks && selectedObject.subTasks.length > 0) {
      extractSubTasks(selectedObject.subTasks);
    }

    return tasks;
  };

  const subTaskLabels = extractSubTasksForObject(
    courseType === "react" ? reactData : nodeData
  );

  const data = {
    labels: subTaskLabels,
    datasets: [
      {
        label: "Status of timeline sheet",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "#b5e2ff",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Status of timeline sheet</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TimeSheetStats;
