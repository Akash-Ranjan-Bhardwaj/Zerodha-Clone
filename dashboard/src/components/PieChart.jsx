// PieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend
} from "chart.js";

// Register chart components
ChartJS.register(ArcElement, ChartTooltip, ChartLegend);

const PieChart = ({ watchlist }) => {
  // Prepare data for the Pie chart
  const chartData = {
    labels: watchlist.map(stock => stock.name), // Stock names as labels
    datasets: [
      {
        label: "Stock Prices",
        data: watchlist.map(stock => stock.price), // Stock prices as data
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40"
        ], // Colors for each slice
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333" // Label color
        }
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      }
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Stock Price Distribution</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
