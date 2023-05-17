import { useContext, useState } from "react";
import "./Content.css";
import { ThemeContext } from "../ThemeContext";

import Analytics from "../Components/AnalyticsTemplate/Analytics";
import Header from "../Components/HeaderTemplate/Header";

const Content = () => {
  const [username, setusername] = useState();
  const { DarkTheme } = useContext(ThemeContext);
  const [value_i] = useState(Math.floor(Math.random() * 100));
  const [value_i_offset] = useState(315 - (value_i / 100) * 315);

  const [value_ii] = useState(Math.floor(Math.random() * 100));
  const [value_ii_offset] = useState(315 - (value_ii / 100) * 315);
  // Date
  // const date = new Date();
  // const day = date.toLocaleDateString("en-US", { day: "numeric" });
  // const month = date.toLocaleDateString("en-US", { month: "long" });
  // const year = date.toLocaleDateString("en-US", { year: "numeric" });
  // Date

  return (
    <div className={`content ${DarkTheme && "dark"}`}>
      <div className="row header">
        <h1 className="txt-head "> Temperature</h1>
        <span className="last-monitor">as of May 15, 2023 10 am</span>
        <div className="divider"></div>
        <h1 className="txt-temp">34°C</h1>
      </div>
      <div className="row header">
        <h1 className="txt-head "> Humidity</h1>
        <span className="last-monitor">as of May 15, 2023 10 am</span>
        <div className="divider"></div>
        <h1 className="txt-humid">43%</h1>
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
            {/* <CircularProgress
              color="#85def6"
              value={value_ii}
              offset={value_ii_offset}
            /> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Content;
