import { useContext } from "react";
import "./Header.css";
import { ThemeContext } from "../../ThemeContext";

import DateTime from "../DateTime/DateTime";

const Header = () => {
  const { DarkTheme, setDarkTheme } = useContext(ThemeContext);

  return (
    <header className={` ${DarkTheme && "dark"}`}>
      <DateTime />
    </header>
  );
};

export default Header;
