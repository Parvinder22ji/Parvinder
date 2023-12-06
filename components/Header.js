import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Header = () => {
  const location = useLocation();
  const isListDataPage = location.pathname === "/listdata";
  const { user, logoutUser } = useAuth();

  return (
    <div className="header">
      <div>
        <Link id="header-logo" to="/">
          GAMS
        </Link>
      </div>

      {user && (
        <div className="links--wrapper">
          <Link to="/profile" className="header--link">
            About us   
          </Link>
          {isListDataPage ? (
            <Link to="/adddata" className="header--link">
              Add Data
            </Link>
          ) : (
            <Link to="/listdata" className="header--link">
              List Data
            </Link>
          )}

          <button onClick={logoutUser} className="btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
