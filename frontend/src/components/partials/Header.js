import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useUserAuthContext } from "../../hooks/useUserAuthContext";
import { useLocationsContext } from "../../hooks/useLocationsContext";

const Header = () => {
  const { user } = useUserAuthContext();
  const { locations } = useLocationsContext();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <div id="headerContainer">
      {locations ?
        <div className="partialTabContainer">
          <span className="link partialTab" onClick={() => navigate("/home")}>Home</span>
          <span className="link partialTab" onClick={() => navigate("/weather")}>View weather</span>
          <span className="link partialTab" onClick={handleLogout}>
            {user ? 
              <span>Log out</span>
              :
              <span>Delete guest profile</span>
            }
          </span>
        </div>
      :
        <div className="partialTabContainer">
          <Link to="/login" className="link partialTab" style={{ textDecoration: "none" }}><span>Login</span></Link>
          <Link to="/home" className="link partialTab" style={{ textDecoration: "none" }}><span>Home</span></Link>
          <Link to="/register" className="link partialTab" style={{ textDecoration: "none" }}><span>Create account</span></Link>
        </div>
      }
    </div>
  );
}

export default Header;
