import "./Analytics.css";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  PieChart,
  Pie,
  LineChart,
  YAxis,
  Line,
} from "recharts";

const Analytics = ({ chart_i, chart_ii, chart_iii, month1, day1, year1 }) => {
  const data = [
    {
      name: "Sept",
      Humidity: 4000,
      Temperature: 2400,
    },
    {
      name: "Oct",
      Humidity: 3000,
      Temperature: 1398,
    },
    {
      name: "Nov",
      Humidity: 2000,
      Temperature: 9800,
    },
    {
      name: "Dec",
      Humidity: 2780,
      Temperature: 3908,
    },
  ];
  const data02 = [
    {
      uv: 4000,
      pv: 2400,
    },
    {
      uv: 3000,
      pv: 1398,
    },
    {
      uv: 2000,
      pv: 4000,
    },
    {
      uv: 2780,
      pv: 3908,
    },
    {
      uv: 1890,
      pv: 2000,
    },
  ];

  const data03 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];
  const data04 = [
    {
      name: "Group A",
      value: 2000,
    },
    {
      name: "Group B",
      value: 3567,
    },
    {
      name: "Group C",
      value: 598,
    },
    {
      name: "Group D",
      value: 2000,
    },
    {
      name: "Group E",
      value: 1000,
    },
    {
      name: "Group F",
      value: 2500,
    },
  ];
  return (
    <div className="analytics">
      {chart_i && (
        <>
          {" "}
          <header>
            <span className="followers">Humidity:</span>
            <span className="earnings">Temperature:</span>
          </header>
          <BarChart className="chart" width={250} height={210} data={data}>
            <CartesianGrid strokeDasharray="100 10" />
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Humidity" fill="#00464e" />
            <Bar dataKey="Temperature" fill="#810551" />
          </BarChart>
        </>
      )}

      {chart_ii && (
        <LineChart
          width={260}
          height={220}
          data={data02}
          margin={{ right: 10, top: 10 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#810551" />
          <Line type="monotone" dataKey="uv" stroke="#00464e" />
        </LineChart>
      )}

      {chart_iii && (
        <PieChart width={300} height={300}>
          <Pie
            data={data03}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#00464e"
          />
          <Pie
            data={data04}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            fill="#810551"
            label
          />
        </PieChart>
      )}

      {month1 && (
        <>
          <h1 className="month">{month1}</h1>
          <h1 className="day">{day1}</h1>
          <h1 className="year">{year1}</h1>
        </>
      )}
    </div>
  );
};

export default Analytics;
