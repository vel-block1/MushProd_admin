import { useContext, useState, useEffect } from "react";
import "./Content.css";
import { ThemeContext } from "../ThemeContext";

import Analytics from "../Components/AnalyticsTemplate/Analytics";
import { getDatabase, ref, onValue, get } from "firebase/database";

const fetchTemperatureAndHumidity = async (date) => {
  const realtimeDB = getDatabase();
  const getDateOnTemp = ref(realtimeDB, date);

  return new Promise((resolve, reject) => {
    onValue(getDateOnTemp, (snapshot) => {
      if (snapshot.exists()) {
        let hasExecuted = false;
        let temperature, humidity;

        snapshot.forEach((childSnapshot) => {
          if (!hasExecuted) {
            const childData = childSnapshot.val();
            temperature = childData.Temp;
            humidity = childData.Humd;
            hasExecuted = true;
          }
        });

        resolve({ temperature, humidity });
      } else {
        console.log("No child nodes found.");
        reject(new Error("No child nodes found."));
      }
    });
  });
};

const Content = () => {
  const { DarkTheme } = useContext(ThemeContext);

  const [date, setDate] = useState("");
  const [temp, setTemp] = useState("");
  const [hum, setHum] = useState("");
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

  useEffect(() => {
    const getCurrentTemp = async () => {
      const date1 = "2023-05-20";
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
      <div className="row header">
        <h1 className="txt-head "> Temperature</h1>
        <span className="last-monitor">as of May 15, 2023 10 am</span>
        <div className="divider"></div>
        <h1 className="txt-temp" id="temp">
          {temp}
          <span className="unit">°C</span>
        </h1>
      </div>
      <div className="row header">
        <h1 className="txt-head "> Humidity</h1>
        <span className="last-monitor">as of May 15, 2023 10 am</span>
        <div className="divider"></div>
        <h1 className="txt-humid" id="humid">
          {hum}
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
