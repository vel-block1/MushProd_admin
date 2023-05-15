import { useContext, useEffect, useState } from "react";
import "./Content.css";
import { ThemeContext } from "../ThemeContext";
import { FiSettings } from "react-icons/fi";
import { RiChat1Line, RiChat3Line } from "react-icons/ri";
import Card from "../Components/CardTemplate/Card";
import { AiOutlineLike, AiOutlineUsergroupAdd } from "react-icons/ai";

import { IoCashOutline } from "react-icons/io5";

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

  useEffect(() => {
    setusername(localStorage.getItem("username"));
  });
  return (
    <div className={`content ${DarkTheme && "dark"}`}>
      <div className="row header">
        <FiSettings className="cog" />
        <h1 className="txt-head">Current Notifications</h1>
        <div className="divider"></div>

        <div className="notifications">
          <RiChat1Line />
          <RiChat1Line />
          <RiChat1Line />
          <RiChat1Line />
          <RiChat1Line />
        </div>
      </div>
      <div className="row header">
        <Card Icon={AiOutlineUsergroupAdd} title="Followers" value="None" />
        <Card Icon={RiChat3Line} title="Messages" value="+0" />
        <Card Icon={AiOutlineLike} title="Likes" value="+ 0" />
        <Card Icon={IoCashOutline} title="Earnings" value="$0" />
      </div>
      <span className="section-title">Brief Overview</span>
      <div className="row square">
        <Analytics chart_i />
      </div>
      <div className="row square">
        {" "}
        <Analytics chart_ii />
      </div>
      <div className="row square">
        {" "}
        <Analytics chart_iii />
      </div>
      <div className="row square">
        <Analytics month1={month} day1={day} year1={year} />
      </div>
      <span className="section-title">Analytic Tools</span>

      <div className="row side-rect">
        <section>
          <CircularProgress
            color="#810551"
            value={value_i}
            offset={value_i_offset}
          />
          <div className="summary">
            <h2 className="summary-title">Total Number of Bags</h2>
            <span className="summary-info">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi,
              necessitatibus. Illo aspernatur error, dolorum quod rerum cumque
              porro perferendis repellat.
            </span>
          </div>
          <CircularProgress
            color="#00464e"
            value={value_ii}
            offset={value_ii_offset}
          />
        </section>
      </div>
      <div className="row side-rect">
        <section>
          {" "}
          <CircularProgress
            color="#00464e"
            value={value_ii}
            offset={value_ii_offset}
          />
          <div className="more-details">
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
      {/* <div className="row side-rect">
        <section>
          {" "}
          <CircularProgress
            color="#810551"
            value={value_i}
            offset={value_i_offset}
          />
          <div className="more-details">
            <h1 className="title">Detailed Analysis</h1>
            <span className="txt">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem ducimus dicta aliquam quae non facere molestiae
              temporibus, earum debitis fugit officiis tempore, incidunt
              perspiciatis cum nostrum. Quam numquam adipisci ullam.
            </span>
          </div>
        </section>
      </div> */}
    </div>
  );
};

export default Content;
