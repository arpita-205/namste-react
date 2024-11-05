import React, { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "./custom hooks/useOnlineStatus";

const Header = () => {
  const [buttonName, setButtonName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  return (
    <div className="flex items-center justify-between p-4 bg-green-100">
      <div className="logo-container">
        <img src={LOGO_URL} className="h-24" />
      </div>

      <div className="nav-items flex items-center gap-3">
        <span>Online: {onlineStatus ? "✅" : "❌"}</span>
        <Link to={"/home"}>Home</Link>
        <Link to={"/about"}>About Us</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/cart"}>Cart</Link>
        <Link to={"/grocery"}>Grocery</Link>
        <Link to={"/time-sheet"}>Time Sheet</Link>

        <button
          className="login"
          onClick={() => {
            buttonName === "Login"
              ? setButtonName("Logout")
              : setButtonName("Login");
          }}
        >
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default Header;
