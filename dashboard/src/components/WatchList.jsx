import React, { useContext, useState } from "react";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  ShoppingCartOutlined,
  AttachMoneyOutlined,
} from "@mui/icons-material"; // Added icons for Sell and Buy
import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";
import PieChart from "./PieChart"; // Import PieChart component

const WatchList = () => {
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>

      {/* Pie Chart Component */}
      <PieChart watchlist={watchlist} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);
  const { openBuyWindow } = useContext(GeneralContext); // Access the context

  const handleMouseEnter = () => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = () => {
    setShowWatchlistActions(false);
  };

  const handleBuyClick = () => {
    openBuyWindow(stock.name); // Open the buy window with the stock's name (UID)
  };

  return (
    <li
      className="watchlist-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>

      {showWatchlistActions && (
        <div className="actions">
          <Tooltip
            title="Buy (B)"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="buy" onClick={handleBuyClick}>
              <ShoppingCartOutlined className="icon" />
              Buy
            </button>
          </Tooltip>
          <Tooltip
            title="Sell (S)"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="sell">
              <AttachMoneyOutlined className="icon" />
              Sell
            </button>
          </Tooltip>
          <Tooltip
            title="Analytics (A)"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="action">
              <BarChartOutlined className="icon" />
              Analytics
            </button>
          </Tooltip>
          <Tooltip
            title="More"
            placement="top"
            arrow
            TransitionComponent={Grow}
          >
            <button className="action">
              <MoreHoriz className="icon" />
              More
            </button>
          </Tooltip>
        </div>
      )}
    </li>
  );
};
