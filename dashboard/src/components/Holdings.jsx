import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/holdings");
        setHoldings(response.data);
      } catch (error) {
        console.error("Error fetching holdings:", error);
      }
    };
    fetchHoldings();
  }, []);

  const chartData = {
    labels: holdings.map((stock) => stock.name),
    datasets: [
      {
        label: "Current Price",
        data: holdings.map((stock) => stock.price),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Dark mode for chart only
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Grid lines color (dark theme)
        },
        ticks: {
          color: "#ffffff", // Y-axis labels color (white for dark background)
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Grid lines color (dark theme)
        },
        ticks: {
          color: "#ffffff", // X-axis labels color (white for dark background)
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#ffffff", // Legend text color
        },
      },
      title: {
        display: true,
        text: "Holdings - Current Prices",
        color: "#ffffff", // Title color
        font: {
          size: 18,
        },
      },
    },
    // Set the chart background color to dark
    layout: {
      backgroundColor: "#333", // Dark background for chart only
    },
  };

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      {/* Bar chart with dark theme */}
      <div style={{ width: "80%", margin: "0 auto", backgroundColor: "#333", padding: "20px", borderRadius: "10px" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Holdings table (normal theme) */}
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
