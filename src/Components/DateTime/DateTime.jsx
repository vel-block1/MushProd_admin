import "./DateTime.css";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { FiClock } from "react-icons/fi";
import sun from "../../assets/ph_sun.svg";
import darksun from "../../assets/darkicon/ph_sun.svg";

const DateTime = () => {
  const { DarkTheme } = useContext(ThemeContext);
  const date = new Date();
  // formating date
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.toLocaleDateString("en-US", { year: "numeric" });
  // getting time
  let time = new Date().toLocaleTimeString();

  return (
    <div className={`datetime ${DarkTheme && "dark"}`}>
      <div className="date-div">
        {" "}
        <img
          className="responsive-icon-sun"
          src={DarkTheme ? darksun : sun}
          alt="Sun Icon"
        />
        <h1 className="date">
          {month} {day}, {year}
        </h1>
      </div>

      <div className="time-div">
        <FiClock className="icon" color={DarkTheme ? "#39b7ed" : "#001E45"} />
        <h1 className="time">{time}</h1>
      </div>
    </div>
  );
};

export default DateTime;
