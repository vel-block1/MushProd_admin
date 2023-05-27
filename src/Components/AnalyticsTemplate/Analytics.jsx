import "./Analytics.css";
import { getDatabase, ref, onValue, get } from "firebase/database";
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

const Analytics = ({ chart_i, chart_ii, chart_iii }) => {
  const realtimeDB = getDatabase();
  const [date, setDate] = useState("");

  useEffect(() => {
    const getCurrentDate = async () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setDate(formattedDate);
    };
    getCurrentDate();
  }, []);

  // getting temp and humid over time
  const [data02, setData02] = useState([
    {
      time: `00:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `01:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `02:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `03:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `04:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `05:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `06:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `07:00`,

      humidity: 0,
      temperature: 0,
    },
    {
      time: `08:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `09:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `10:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `11:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `12:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `13:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `14:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `15:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `16:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `17:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `18:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `19:00`,

      humidity: 0,
      temperature: 0,
    },
    {
      time: `20:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `21:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `22:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `23:00`,
      humidity: 0,
      temperature: 0,
    },
    {
      time: `24:00`,
      humidity: 0,
      temperature: 0,
    },
  ]);
  useEffect(() => {
    const fetchTemperatureAndHumidity = async (date, setData02) => {
      const realtimeDB = getDatabase();
      const getDateOnTemp = ref(realtimeDB, date);
      return new Promise((resolve, reject) => {
        onValue(
          getDateOnTemp,
          (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const measurements = Object.values(data);
              const temperatureData = [];
              const humidityData = [];

              measurements.forEach((measurement, index) => {
                if (index % 60 == 0) {
                  temperatureData.push(measurement.Temp);
                  humidityData.push(measurement.Humd);
                }
              });

              // Update the state with fetched values
              setData02((prevState) =>
                prevState.map((item, index) => ({
                  ...item,
                  humidity: humidityData[index] || item.humidity,
                  temperature: temperatureData[index] || item.temperature,
                }))
              );

              resolve({ temperature: temperatureData, humidity: humidityData });
            } else {
              console.log("No child nodes found.");
              reject(new Error("No child nodes found."));
            }
          },
          {
            onlyLast: true, // Add this option to limit the callback to the last snapshot
          }
        );
      });
    };
    fetchTemperatureAndHumidity(date, setData02);
    return () => {
      fetchTemperatureAndHumidity;
      console.log(date);
    };
  }, [date]);
  //adding temp and humid value to chart
  const formattedData = Object.keys(data02).map((key) => ({
    time: key + ":00",
    temperature: data02[key].temperature,
    humidity: data02[key].humidity,
  }));

  // getting average
  const [averages, setAverages] = useState([]);
  useEffect(() => {
    const realtimeDB = getDatabase();

    const fetchData = async () => {
      try {
        const snapshot = await get(ref(realtimeDB, "/"));
        const data = snapshot.val();

        const averageData = [];

        for (const date in data) {
          let totalTemp = 0;
          let totalHumidity = 0;
          let count = 0;

          for (const measurement in data[date]) {
            const { Temp, Humd } = data[date][measurement];
            totalTemp += Temp;
            totalHumidity += Humd;
            count++;
          }

          const averageTemp = totalTemp / count;
          const averageHumidity = totalHumidity / count;

          averageData.push({
            date,
            averageTemp: averageTemp.toFixed(2),
            averageHumidity: averageHumidity.toFixed(2),
          });
        }

        setAverages(averageData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  //adding average value to chart
  const formattedDataAve = averages.map(
    ({ date, averageTemp, averageHumidity }) => ({
      key: date, // Set the key to the value of the date
      date,
      averageTemp,
      averageHumidity,
    })
  );

  //setting sizes for the charts
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
  const modifiedWidth_Temp = chartWidth * 0.7;
  const modifiedHeight_Temp = chartHeight * 0.4;
  const modifiedWidthForBar_Temp = chartWidth * 0.3;
  const modifiedHeightForBar_Temp = chartWidth * 0.2;

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
            width={modifiedWidthForBar_Temp}
            height={modifiedHeightForBar_Temp}
            data={data}
          >
            <CartesianGrid stroke="#68adb1" />
            <XAxis stroke="#68adb1" dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Removed" fill="#ed4343" />
            <Bar dataKey="Added" fill="#69e937" />
          </BarChart>
        </>
      )}
      {chart_ii && (
        <>
          <span>Temperature and Humidity Trends over Time </span>

          <LineChart
            className="respo"
            width={modifiedWidth_Temp}
            height={modifiedHeight_Temp}
            data={formattedData}
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
            <Legend iconType="circle" />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#3333f8"
              name="Temperature"
              strokeWidth={3}
            />
            <Line
              name="Humidity"
              type="monotone"
              dataKey="humidity"
              stroke="#014f50"
              strokeWidth={3}
            />
          </LineChart>
        </>
      )}
      {chart_iii && (
        <>
          <span>Average Temperature and Humidity</span>

          <LineChart
            className="respo"
            width={modifiedWidthForBar_Temp}
            height={modifiedHeightForBar_Temp}
            data={formattedDataAve}
            margin={{ right: 10, top: 10 }}
          >
            <CartesianGrid stroke="#68adb1" strokeDasharray="3 3" />
            <XAxis
              stroke="#68adb1"
              tick={{ fontSize: 12 }}
              label={{ fontSize: 14 }}
              axisLine={{ strokeWidth: 3 }}
              tickLine={{ strokeWidth: 3 }}
              dataKey="date"
            />
            <YAxis
              domain={["dataMin", 150]}
              stroke="#68adb1"
              tick={{ fontSize: 18 }}
              label={{ fontSize: 10 }}
              axisLine={{ strokeWidth: 3 }}
              tickLine={{ strokeWidth: 3 }}
            />
            <Tooltip cursor={{ stroke: "#1076e2", strokeWidth: 2 }} />
            <Legend iconType="circle" />
            <Line
              type="monotone"
              dataKey="averageTemp"
              stroke="#3333f8"
              name="Average Temperature"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="averageHumidity"
              stroke="#014f50"
              strokeWidth={3}
              name="Average Humidity"
            />
          </LineChart>
        </>
      )}
      {/* <ul>  
        {data02.map((item) => (
          <li key={item.time}>
            Time: {item.time}, Temperature: {item.temperature} Humidity:
            {item.humidity}
          </li>
        ))}
      </ul> */}
      {/* {averages.map((average) => (
        <div key={average.date}>
          <p>Date: {average.date}</p>
          <p>Average Temperature: {average.averageTemp}</p>
          <p>Average Humidity: {average.averageHumidity}</p>
          <hr />
        </div>
      ))} */}
    </div>
  );
};

export default Analytics;
