import { useContext, useState, useEffect } from "react";
import "./Content.css";
import { ThemeContext } from "../ThemeContext";

import Analytics from "../Components/AnalyticsTemplate/Analytics";
import { getDatabase, ref, onValue } from "firebase/database";
import GetTemp from "./GetTemp";
import GetDate from "./GetDate";
const Content = () => {
  const { DarkTheme } = useContext(ThemeContext);

  const [date, setDate] = useState("");
  const [id, setId] = useState("");

  // const { temperature, humidity } = GetTemp(GetDate());
  const { temperature, humidity } = GetTemp("2023-05-18");

  return (
    <div className={`content ${DarkTheme && "dark"}`}>
      <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>

      <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js"></script>
      <div className="row header">
        <h1 className="txt-head "> Temperature</h1>
        <span className="last-monitor">as of May 15, 2023 10 am</span>
        <div className="divider"></div>
        <h1 className="txt-temp" id="temp">
          {temperature}
          <span className="unit">°C</span>
        </h1>
      </div>
      <div className="row header">
        <h1 className="txt-head "> Humidity</h1>
        <span className="last-monitor">as of May 15, 2023 10 am</span>
        <div className="divider"></div>
        <h1 className="txt-humid" id="humid">
          {humidity}
          <span className="units">%</span>
        </h1>
      </div>
      <span className="section-title">Brief Overview</span>
      <div className="row square">
        <Analytics chart_i />
      </div>
      <div className="row square">
        {" "}
        <Analytics chart_ii />
      </div>

      <div className="row side-rect">
        <section>
          {" "}
          <div className="row header">
            <h2 className="txt-head">Yield Predicted </h2>
            <span className="last-monitor">May 15, 2023</span>
            <div className="divider"></div>
            <h1 className="txt-temp">43g-40g</h1>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Content;
