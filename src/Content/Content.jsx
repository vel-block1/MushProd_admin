import { useContext, useState, useEffect } from "react";
import "./Content.css";
import { ThemeContext } from "../ThemeContext";

import Analytics from "../Components/AnalyticsTemplate/Analytics";
import firebase from "../Firebase";
import {
  getDatabase,
  ref,
  onValue,
  orderByKey,
  limitToLast,
} from "firebase/database";
const Content = () => {
  const { DarkTheme } = useContext(ThemeContext);
  const [value_i] = useState(Math.floor(Math.random() * 100));

  const [value_ii] = useState(Math.floor(Math.random() * 100));

  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");

  const realtimeDB = getDatabase();

  const [date, setDate] = useState("");
  const [id, setId] = useState("");

  const [hasExecuted, setHasExecuted] = useState(false);

  useEffect(() => {
    const getCurrentDate = async () => {
      const currentDate = new Date();
      // Format the date to match the Firebase database structure (YYYY-MM-DD)
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setDate(formattedDate);
    };
    getCurrentDate();
  });
  useEffect(() => {
    const getCurrentData = async () => {
      const getDateOnTemp = ref(realtimeDB, "2023-05-18");
      // const getDateOnTemp = ref(realtimeDB, ${date});

      onValue(getDateOnTemp, (snapshot) => {
        if (snapshot.exists()) {
          let hasExecuted = false;

          snapshot.forEach((childSnapshot) => {
            if (!hasExecuted) {
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();
              const childHumidity = childData.Humd;
              const childTemperature = childData.Temp;

              // console.log("Child Node:", childKey);
              // console.log("Humidity:", childHumidity);
              // console.log("Temperature:", childTemperature);

              setTemperature(childTemperature);
              setHumidity(childHumidity);
              hasExecuted = true;
            }
          });
        } else {
          console.log("No child nodes found.");
        }
      });
    };

    getCurrentData();
  });
  // useEffect(() => {
  //   const getCurrentData = async () => {
  //     // const getDateOnTemp = firebase.getDatabase().ref(formattedDate);
  //     const getDateOnTemp = ref(realtimeDB, "2023-05-18");

  //     // const query = getDateOnTemp.orderByKey().limitToLast(1);

  //     // console.log(query);

  //     onValue(getDateOnTemp, (snapshot) => {
  //       // if (snapshot.exists()) {
  //       snapshot.forEach((childSnapshot) => {
  //         const childKey = childSnapshot.key;
  //         const childData = childSnapshot.val();
  //         const childHumidity = childData.Humd;
  //         const childTemperature = childData.Temp;

  //         console.log("Child Node:", childKey);
  //         console.log("Humidity:", childHumidity);
  //         console.log("Temperature:", childTemperature);

  //         setTemperature(childTemperature);
  //         setHumidity(childHumidity);
  //       });
  //       // } else {
  //       //   console.log("No child nodes found.");
  //       // }
  //       // const data = snapshot.val();
  //       // setTemperature(data.Temp);
  //       // setHumidity(data.Humd);
  //     });
  //   };

  //   getCurrentData();
  // });

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
          {humidity} <span className="units">%</span>
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
