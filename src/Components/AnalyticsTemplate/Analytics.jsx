import "./Analytics.css";
import { useEffect, useState } from "react";

import {
  XAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  LineChart,
  YAxis,
  Line,
} from "recharts";

const Analytics = ({ chart_i, chart_ii }) => {
  const data = [
    {
      name: "Jan",
      Removed: 4000,
      Added: 2400,
    },
    {
      name: "Feb",
      Removed: 3000,
      Added: 1398,
    },
    {
      name: "Mar",
      Removed: 2000,
      Added: 9800,
    },
    {
      name: "Apr",
      Removed: 2780,
      Added: 3908,
    },
    {
      name: "May",
      Removed: 2780,
      Added: 3908,
    },
  ];
  const data02 = [
    {
      time: `00:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `01:00`,
      humidity: 80,
      temperature: 29,
    },
    {
      time: `02:00`,
      humidity: 81,
      temperature: 29.3,
    },
    {
      time: `03:00`,
      humidity: 78,
      temperature: 30,
    },
    {
      time: `04:00`,
      humidity: 80,
      temperature: 37,
    },
    {
      time: `05:00`,
      humidity: 57,
      temperature: 37,
    },
    {
      time: `06:00`,
      humidity: 78,
      temperature: 30,
    },
    {
      time: `07:00`,

      humidity: 80,
      temperature: 31,
    },
    {
      time: `08:00`,
      humidity: 78,
      temperature: 30,
    },
    {
      time: `09:00`,
      humidity: 90,
      temperature: 65,
    },
    {
      time: `10:00`,
      humidity: 85,
      temperature: 89,
    },
    {
      time: `11:00`,
      humidity: 90,
      temperature: 31,
    },
    {
      time: `12:00`,
      humidity: 65,
      temperature: 35,
    },
    {
      time: `13:00`,
      humidity: 80,
      temperature: 29,
    },
    {
      time: `14:00`,
      humidity: 81,
      temperature: 29.3,
    },
    {
      time: `15:00`,
      humidity: 78,
      temperature: 30,
    },
    {
      time: `16:00`,
      humidity: 80,
      temperature: 37,
    },
    {
      time: `17:00`,
      humidity: 57,
      temperature: 37,
    },
    {
      time: `18:00`,
      humidity: 78,
      temperature: 30,
    },
    {
      time: `19:00`,

      humidity: 80,
      temperature: 31,
    },
    {
      time: `20:00`,
      humidity: 78,
      temperature: 30,
    },
    {
      time: `21:00`,
      humidity: 90,
      temperature: 65,
    },
    {
      time: `22:00`,
      humidity: 85,
      temperature: 89,
    },
    {
      time: `23:00`,
      humidity: 90,
      temperature: 31,
    },
    {
      time: `24:00`,
      humidity: 65,
      temperature: 35,
    },
  ];

  const [chartWidth, setChartWidth] = useState(window.innerWidth * 1);
  const [chartHeight, setChartHeight] = useState(window.innerHeight * 1);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth);
      setChartHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const modifiedWidth = chartWidth * 0.7;
  const modifiedHeight = chartHeight * 0.4;
  const modifiedWidthForBar = chartWidth * 0.3;
  const modifiedHeightForBar = chartWidth * 0.2;

  return (
    <div className="analytics">
      {chart_i && (
        <>
          {" "}
          <header>
            <span className="remove">Removed </span>
            <span className="added">Added</span>
          </header>
          <BarChart
            className="chart"
            width={modifiedWidthForBar}
            height={modifiedHeightForBar}
            data={data}
          >
            <CartesianGrid strokeDasharray="100 10" />
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Removed" fill="#e12121" />
            <Bar dataKey="Added" fill="#3dca05" />
          </BarChart>
        </>
      )}

      {chart_ii && (
        <>
          {/* <span>Temperature and Humidity Trends over Time </span> */}

          <LineChart
            className="respo"
            width={modifiedWidth}
            height={modifiedHeight}
            data={data02}
            margin={{ right: 10, top: 10 }}
          >
            <CartesianGrid stroke="#68adb1" strokeDasharray="3 3" />
            <XAxis
              stroke="#68adb1"
              tick={{ fontSize: 12 }}
              label={{ fontSize: 14 }}
              axisLine={{ strokeWidth: 3 }}
              tickLine={{ strokeWidth: 3 }}
              dataKey="time"
            />
            <YAxis
              stroke="#68adb1"
              tick={{ fontSize: 18 }}
              label={{ fontSize: 10 }}
              axisLine={{ strokeWidth: 3 }}
              tickLine={{ strokeWidth: 3 }}
            />
            <Tooltip cursor={{ stroke: "#1076e2", strokeWidth: 2 }} />
            <Legend />
            <Line
              type="monotone"
              dataKey={"temperature"}
              stroke="#3333f8"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#014f50"
              strokeWidth={3}
            />
          </LineChart>
        </>
      )}
    </div>
  );
};

export default Analytics;
