import React from "react";
import { logout } from "../../Services/authService";
import { useNavigate } from "react-router-dom";
import "./HeaderStyles.css";
import { useDispatch } from "react-redux";
import { getUserSuccess, removeUser } from "../../Store/User/actions";
import { removeUrls } from "../../Store/Url/actions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeUser())
    dispatch(removeUrls())
    console.log()
    navigate("/");
  };

  return (
    <header className="header">
      <h1 className="header-title">URL Shortener</h1>
      <div>
        <span className="icon">👤</span>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
