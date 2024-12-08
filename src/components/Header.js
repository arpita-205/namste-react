import React, { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link, useLocation, useParams } from "react-router-dom";
import useOnlineStatus from "./custom hooks/useOnlineStatus";

const Header = () => {
  const [buttonName, setButtonName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const location = useLocation();
  return (
    <div className="flex items-center justify-between p-4 bg-green-100">
      <div className="logo-container">
        <img src={LOGO_URL} className="h-12" />
      </div>

      <div className="nav-items flex items-center gap-4 text-md font-medium">
        <span>Online: {onlineStatus ? "✅" : "❌"}</span>
        <Link
          to={"/home"}
          className={
            location.pathname.includes("/home")
              ? "text-green-600 font-bold"
              : ""
          }
        >
          Home
        </Link>
        <Link
          to={"/about"}
          className={
            location.pathname.includes("/about")
              ? "text-green-600 font-bold"
              : ""
          }
        >
          About Us
        </Link>
        <Link
          to={"/contact"}
          className={
            location.pathname.includes("/contact")
              ? "text-green-600 font-bold"
              : ""
          }
        >
          Contact
        </Link>
        <Link
          to={"/cart"}
          className={
            location.pathname.includes("/cart")
              ? "text-green-600 font-bold"
              : ""
          }
        >
          Cart
        </Link>
        <Link
          to={"/grocery"}
          className={
            location.pathname.includes("/grocery")
              ? "text-green-600 font-bold"
              : ""
          }
        >
          Grocery
        </Link>
        <Link
          to={"/time-sheet"}
          className={
            location.pathname.includes("/time-sheet")
              ? "text-green-600 font-bold"
              : ""
          }
        >
          Time Sheet
        </Link>

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
