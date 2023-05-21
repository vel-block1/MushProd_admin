import { useContext, useState, useEffect } from "react";
import "./Content.css";
import { ThemeContext } from "../ThemeContext";
import Linechart from "../Components/LineChart/Linechart";
import Analytics from "../Components/AnalyticsTemplate/Analytics";
import { getDatabase, ref, onValue } from "firebase/database";

const Content = () => {
  const { DarkTheme } = useContext(ThemeContext);

  const [date, setDate] = useState("");
  const [temp, setTemp] = useState("");
  const [hum, setHum] = useState("");

  const fetchTemperatureAndHumidity = async (date) => {
    const realtimeDB = getDatabase();
    const getDateOnTemp = ref(realtimeDB, date);
    return new Promise((resolve, reject) => {
      onValue(
        getDateOnTemp,
        (snapshot) => {
          if (snapshot.exists()) {
            let temperature, humidity;
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              temperature = childData.Temp;
              humidity = childData.Humd;
            });
            resolve({ temperature, humidity });
            // setTemp(temperature);
            setHum(humidity);
            setTemp(temperature);
            // console.log(" Temp " + temperature);
            // console.log(" Humid " + humidity);
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

  useEffect(() => {
    const getCurrentDate = async () => {
      console.log("sad");
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setDate(formattedDate);
      console.log("sads");
    };
    getCurrentDate();
  }, []);

  useEffect(() => {
    console.log(date);
    const getCurrentTemp = async () => {
      const date1 = "2023-05-21";
      const { temperature, humidity } = await fetchTemperatureAndHumidity(
        date1
      );
      setTemp(temperature);
      setHum(humidity);
    };

    if (date) {
      getCurrentTemp();
    }
  }, [date]);

  return (
    <div className={`content ${DarkTheme && "dark"}`}>
      <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>

      <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js"></script>

      <div className="row cont">
        <h1 className="txt-head-dash "> Temperature</h1>
        <h2>Normal</h2>
        <div className="divider"></div>
        <h1 className="txt-temp" id="temp">
          {temp}
          <span className="unit">°C</span>
        </h1>
      </div>
      <div className="row cont">
        <h1 className="txt-head-dash "> Humidity</h1>
        <h2>Normal</h2>
        <div className="divider"></div>
        <h1 className="txt-humid" id="humid">
          {hum}
          <span className="units">%</span>
        </h1>
      </div>
      <div className="row cont">
        <h1 className="txt-head-dash "> Yield Predicted</h1>
        <h2>May 15, 2023</h2>
        <div className="divider"></div>
        <h1 className="txt-yield" id="yield">
          40-43
          <span className="units">g</span>
        </h1>
      </div>
      <div className="row cont">
        <h1 className="txt-head-dash "> Total Bag</h1>
        <h2>as of May 15,2023</h2>
        <div className="divider"></div>
        <h1 className="txt-bags" id="total_bags">
          1000
        </h1>
      </div>
      <div className="row headerTemp">
        <Analytics chart_ii />
      </div>
      <div className="row squareBags">
        <Analytics chart_i />
      </div>
    </div>
  );
};

export default Content;
