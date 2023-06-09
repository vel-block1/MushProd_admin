import Nav from "../NavIconTemplate/Nav";
import "./Navigation.css";
import { FiChevronLeft, FiBell } from "react-icons/fi";
import { TbDashboard, TbFilePencil, TbPlant } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { MdSwapHoriz } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../ThemeContext";
import { NavLink } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";

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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setusername(user.email);
      }
    });

    return unsubscribe;
  }, []);

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
          <FiUser className="profile-img" />
        </div>
        <span>{username} </span>
      </header>
      <NavLink to="/">
        <Nav Icon={TbDashboard} title={"Dashboard"} />
      </NavLink>

      <NavLink to="/records">
        <Nav Icon={TbFilePencil} title={"Records"} />
      </NavLink>
      <NavLink to="/harvested">
        <Nav Icon={TbPlant} title={"Harvest"} />
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
