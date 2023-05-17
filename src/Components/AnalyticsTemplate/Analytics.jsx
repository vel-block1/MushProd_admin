import "./Analytics.css";
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
      name: "Sept",
      Removed: 4000,
      Added: 2400,
    },
    {
      name: "Oct",
      Removed: 3000,
      Added: 1398,
    },
    {
      name: "Nov",
      Removed: 2000,
      Added: 9800,
    },
    {
      name: "Dec",
      Removed: 2780,
      Added: 3908,
    },
  ];
  const data02 = [
    {
      name: 1,
      humidity: 50,
      temperature: 39,
    },
    {
      name: 2,

      humidity: 57,
      temperature: 36,
    },
    {
      name: 3,

      humidity: 37,
      temperature: 34,
    },
    {
      name: 4,
      humidity: 67,
      temperature: 35,
    },
    {
      name: 5,

      humidity: 57,
      temperature: 37,
    },
  ];

  return (
    <div className="analytics">
      {chart_i && (
        <>
          {" "}
          <header>
            <span className="remove">Removed </span>
            <span className="added">Added</span>
          </header>
          <BarChart className="chart" width={250} height={210} data={data}>
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
          <span>May</span>

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
            <Line type="monotone" dataKey="temperature" stroke="#3333f8" />
            <Line type="monotone" dataKey="humidity" stroke="#014f50" />
          </LineChart>
        </>
      )}
    </div>
  );
};

export default Analytics;
