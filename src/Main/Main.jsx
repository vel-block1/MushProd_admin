import { useContext } from "react";
import "./Main.css";
import { ThemeContext } from "../ThemeContext";
import Header from "../Components/HeaderTemplate/Header";
import Content from "../Content/Content";
import DateTime from "../Components/DateTime/DateTime";

const Main = () => {
  const { DarkTheme } = useContext(ThemeContext);

  return (
    <div className={`main ${DarkTheme && "dark"}`}>
      {/* <Header /> */}
      <DateTime />
      <Content />
    </div>
  );
};

export default Main;
