// NavigationPage.js

import React from "react";
import { Link } from "react-router-dom";

const NavigationPage = () => {
  return (
    <div className="navigation-container">
      <h2>Welcome to the Navigation Page</h2>
      <div className="options-container">
        <Link to="/login">
          <button className="option-button">Admin</button>
        </Link>
        <Link to="/Guest">
          <button className="option-button">User</button>
        </Link>
      </div>
    </div>
  );
};

export default NavigationPage;
