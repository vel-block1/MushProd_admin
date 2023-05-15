import "./DateTime.css";
import Time from "./Time";
import { FiCalendar, FiClock } from "react-icons/fi";
const DateTime = () => {
  const date = new Date();

  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.toLocaleDateString("en-US", { year: "numeric" });

  return (
    <div className="datetime">
      <div className="date-div">
        {" "}
        <FiCalendar className="icon" />
        <h1 className="date">
          {month} {day}, {year}
        </h1>
      </div>

      <div className="time-div">
        <FiClock className="icon" />
        <h1 className="time">
          <Time />
        </h1>
      </div>
    </div>
  );
};

export default DateTime;
