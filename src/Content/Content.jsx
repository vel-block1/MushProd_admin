import { useContext, useState } from "react";
import "./Content.css";
import { ThemeContext } from "../ThemeContext";

import Analytics from "../Components/AnalyticsTemplate/Analytics";

import CircularProgress from "../Components/CircularProgress/CircularProgress";

const Content = () => {
  const [username, setusername] = useState();
  const { DarkTheme } = useContext(ThemeContext);
  const [value_i] = useState(Math.floor(Math.random() * 100));
  const [value_i_offset] = useState(315 - (value_i / 100) * 315);

  const [value_ii] = useState(Math.floor(Math.random() * 100));
  const [value_ii_offset] = useState(315 - (value_ii / 100) * 315);
  // Date
  const date = new Date();
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.toLocaleDateString("en-US", { year: "numeric" });
  // Date

  return (
    <div className={`content ${DarkTheme && "dark"}`}>
      <div className="row header">
        <h1 className="txt-head"> Temperature</h1>
        <span className="last-monitor">as of May 15, 2023 10 am</span>
        <div className="divider"></div>
        <h1 className="txt-temp">34°C</h1>
      </div>
      <div className="row header">
        <h1 className="txt-head"> Humidity</h1>
        <span className="last-monitor">as of May 15, 2023 10 am</span>
        <div className="divider"></div>
        <h1 className="txt-temp">43%</h1>
      </div>
      <span className="section-title">Brief Overview</span>
      <div className="row square">
        <Analytics chart_i />
      </div>
      <div className="row square">
        {" "}
        <Analytics chart_ii />
      </div>

      <span className="section-title">Analytic Tools</span>
      <div className="row side-rect">
        <section>
          <CircularProgress
            color="#85def6"
            value={value_i}
            offset={value_i_offset}
          />
          <div className="number_bags">
            <h2 className="number_bags-title">Total Number of Bags</h2>
            <span className="number_bags-info">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi,
              necessitatibus. Illo aspernatur error, dolorum quod rerum cumque
              porro perferendis repellat.
            </span>
          </div>
          <CircularProgress
            color="#b8ccff"
            value={value_ii}
            offset={value_ii_offset}
          />
        </section>
      </div>
      <div className="row side-rect">
        <section>
          {" "}
          <CircularProgress
            color="#85def6"
            value={value_ii}
            offset={value_ii_offset}
          />
          <div className="yield-details">
            <h1 className="title">Yield Analysis</h1>
            <span className="txt">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem ducimus dicta aliquam quae non facere molestiae
              temporibus, earum debitis fugit officiis tempore, incidunt
              perspiciatis cum nostrum. Quam numquam adipisci ullam.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Content;
