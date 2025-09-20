// src/Graph.jsx
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";

// Register Chart.js components
ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler,
  Title
);

const Graph = ({ dataSource }) => {
  const [myUrllist, setMyUrllist] = useState([]);

  useEffect(() => {
    setMyUrllist(dataSource || []);
  }, [dataSource]);

  const hasData = myUrllist.length > 0;

  const labels = hasData
    ? myUrllist.map((item) => item.clickDate)
    : ["", "", "", "", "", "", "", "", "", "", "", ""];
  const userPerDay = hasData
    ? myUrllist.map((item) => item.count)
    : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1];

  const data = {
    labels,
    datasets: [
      {
        label: "Total Clicks",
        data: userPerDay,
        backgroundColor: hasData ? "#3b82f6" : "rgba(219, 228, 235, 1)",
        borderColor: "#1D2327",
        borderWidth: 1,
        barThickness: 25,
        categoryPercentage: 0.7,
        barPercentage: 0.8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // Add devicePixelRatio for high-resolution rendering
    devicePixelRatio: 2, // You can increase this for even sharper results on high-DPI screens
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            weight: 500,
            size: 14,
            family: "system-ui, -apple-system, sans-serif",
          },
          color: "#4B5563",
        },
      },
      title: {
        display: true,
        text: "Number Of Clicks",
        font: {
          family: "system-ui, -apple-system, sans-serif",
          size: 20,
          weight: "700",
        },
        color: "#1F2937",
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(31, 41, 55, 0.9)",
        titleFont: {
          size: 14,
          weight: "bold",
          family: "system-ui, -apple-system, sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "system-ui, -apple-system, sans-serif",
        },
        padding: 12,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
          borderDash: [4, 4],
        },
        ticks: {
          font: {
            family: "system-ui, -apple-system, sans-serif",
            size: 12,
          },
          color: "#6B7280",
          callback: hasData
            ? function (value) {
                return Number.isInteger(value) ? value.toString() : "";
              }
            : function () {
                return "";
              },
        },
        title: {
          display: true,
          text: "Count",
          font: {
            family: "system-ui, -apple-system, sans-serif",
            size: 14,
            weight: "600",
          },
          color: "#4B5563",
          padding: { top: 0, bottom: 10 },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "system-ui, -apple-system, sans-serif",
            size: 12,
          },
          color: "#6B7280",
          maxRotation: 45,
          minRotation: 45,
        },
        title: {
          display: true,
          text: "Date",
          font: {
            family: "system-ui, -apple-system, sans-serif",
            size: 14,
            weight: "600",
          },
          color: "#4B5563",
          padding: { top: 10, bottom: 0 },
        },
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="w-full h-96" // fixed height keeps canvas sharp
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Bar data={data} options={options} />
    </motion.div>
  );
};

export default Graph;
