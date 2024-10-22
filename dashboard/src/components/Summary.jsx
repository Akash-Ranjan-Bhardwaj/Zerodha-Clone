import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  // State variables
  const [marginAvailable, setMarginAvailable] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [investment, setInvestment] = useState(0);
  const [marginsUsed, setMarginsUsed] = useState(0);

  // Function to fetch financial data
  const fetchFinancialData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/financial-data");
      const data = response.data;
      setMarginAvailable(data.marginAvailable);
      setCurrentValue(data.currentValue);
      setInvestment(data.investment);
      setMarginsUsed(data.marginsUsed);
    } catch (error) {
      console.error("Error fetching financial data:", error);
    }
  };

  // Fetch data on component mount and set up polling for updates
  useEffect(() => {
    fetchFinancialData(); // Initial fetch

    const interval = setInterval(() => {
      fetchFinancialData(); // Polling for updates every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  // Function to handle buying an order
  const handleBuyOrder = async (orderCost) => {
    try {
      // Simulate order purchase
      await axios.post("http://localhost:3002/api/buy-order", { orderCost });
      fetchFinancialData(); // Re-fetch data after purchase
    } catch (error) {
      console.error("Error buying order:", error);
    }
  };

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{marginAvailable / 1000}k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{marginsUsed}</span>
            </p>
            <p>
              Opening balance <span>{marginAvailable / 1000}k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              {currentValue - investment} <small>{((currentValue - investment) / investment * 100).toFixed(2)}%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{currentValue}</span>
            </p>
            <p>
              Investment <span>{investment}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Example button to simulate buying an order */}
      <button onClick={() => handleBuyOrder(500)}>Buy Order for 500</button>
    </>
  );
};

export default Summary;
