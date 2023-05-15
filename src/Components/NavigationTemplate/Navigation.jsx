import Nav from "../NavIconTemplate/Nav";
import "./Navigation.css";
import { FiChevronLeft, FiBell } from "react-icons/fi";
import { TbDashboard, TbFileUpload, TbFilePencil } from "react-icons/tb";

import { MdSwapHoriz } from "react-icons/md";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../ThemeContext";
import { NavLink } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { HiOutlineLogout } from "react-icons/hi";

const Navigation = () => {
  const [nav, setnav] = useState(false);
  const [username, setusername] = useState(false);
  // setting dark theme
  const { DarkTheme, setDarkTheme } = useContext(ThemeContext);

  function changeTheme() {
    setDarkTheme(!DarkTheme);
  }
  const logout = () => {
    signOut(auth);
  };
  useEffect(() => {
    setusername(localStorage.getItem("username"));
  });
  return (
    <div className={`navigation ${nav && "active"} ${DarkTheme && "dark"}`}>
      <div
        className={`menu ${nav && "active"}`}
        onClick={() => {
          setnav((prevState) => !prevState);
        }}
      >
        <FiChevronLeft className="menu-icon" />
      </div>
      <header>
        <div className="profile">
          <img src="" alt="user-img" className="profile-img" />
        </div>
        <span>{username}</span>
      </header>
      <NavLink to="/">
        <Nav Icon={TbDashboard} title={"Dashboard"} />
      </NavLink>
      <NavLink to="/yield">
        <Nav Icon={TbFileUpload} title={"Yield Analysis"} />
      </NavLink>
      <NavLink to="/records">
        <Nav Icon={TbFilePencil} title={"Records"} />
      </NavLink>
      <NavLink to="/notification">
        <Nav Icon={FiBell} title={"Notification"} />
      </NavLink>
      <div className="divider"></div>

      <div className="divider"></div>
      <Nav
        Icon={MdSwapHoriz}
        title={`${
          DarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"
        }`}
        onClick={changeTheme}
      />
      <Nav Icon={HiOutlineLogout} title={"Log Out"} onClick={logout} />
    </div>
  );
};

export default Navigation;
