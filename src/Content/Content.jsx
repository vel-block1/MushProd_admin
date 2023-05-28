import { useContext, useState, useEffect } from "react";
import "./Content.css";
import { ThemeContext } from "../ThemeContext";
import Analytics from "../Components/AnalyticsTemplate/Analytics";
import { getDatabase, ref, onValue } from "firebase/database";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../Firebase";

// icons
import icontemp from "../assets/raphael_temp.svg";
import iconhumid from "../assets/mdi_water.svg";
import iconyield from "../assets/Predict.svg";
import iconbag from "../assets/Mushroom.svg";
import darkIconTemp from "../assets/darkicon/raphael_temp.svg";
import darkIconhumid from "../assets/darkicon/mdi_water.svg";
import darkIconyield from "../assets/darkicon/Predict.svg";
import darkIconbag from "../assets/darkicon/Mushroom.svg";

const Content = () => {
  const { DarkTheme } = useContext(ThemeContext);
  const usersCollectionRef = collection(db, "bags");

  const [date, setDate] = useState("");
  const [temp, setTemp] = useState("");
  const [hum, setHum] = useState("");
  const [bags, setBags] = useState("");

  // getting all records of bags
  const refreshBags = async () => {
    try {
      const querySnapshot = await getDocs(usersCollectionRef);
      const bagsData = querySnapshot.docs.map((doc) => doc.data());

      setBags(bagsData.reduce((sum, bag) => sum + bag.quantity, 0));
    } catch (error) {
      console.log(error);
      return 0;
    }
  };
  useEffect(() => {
    refreshBags();
  }, []);

  //getting all temp and humid data
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

            setHum(humidity);
            setTemp(temperature);
          } else {
            console.log("No child nodes found.");
            reject(new Error("No child nodes found."));
          }
        },
        {
          onlyLast: true,
        }
      );
    });
  };
  //getting date and formatting
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
  //getting current readings
  useEffect(() => {
    const getCurrentTemp = async () => {
      const { temperature, humidity } = await fetchTemperatureAndHumidity(date);
      setTemp(temperature);
      setHum(humidity);
    };

    if (date) {
      getCurrentTemp();
    }
  }, [date]);

  //setting remarks on temp and humid
  let statusTemp = "";
  if (temp > 10 && temp <= 29) {
    statusTemp = "Normal Temperature";
  } else if (temp >= 30) {
    statusTemp = "High Temperature";
  } else if (temp <= 10) {
    statusTemp = "Low Temperature";
  }
  let statusHumid = "";
  if (hum > 80) {
    statusHumid = "Normal Humidity";
  } else {
    statusHumid = "Low Humidity";
  }

  return (
    <div className={`content ${DarkTheme && "dark"}`}>
      <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>

      <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js"></script>

      <div className="row cont">
        <h1 className="txt-head-dash "> Temperature</h1>
        <h2>{statusTemp}</h2>
        <div className="divider"></div>
        <h1 className="txt-temp" id="temp">
          <img
            className="responsive-icon"
            src={DarkTheme ? darkIconTemp : icontemp}
            alt="Temperature Icon"
          />
          {temp}
          <span className="unit">°C</span>
        </h1>
      </div>
      <div className="row cont">
        <h1 className="txt-head-dash "> Humidity</h1>
        <h2>{statusHumid}</h2>
        <div className="divider"></div>
        <h1 className="txt-humid" id="humid">
          <img
            className="responsive-icon"
            src={DarkTheme ? darkIconhumid : iconhumid}
            alt="Temperature Icon"
          />
          {hum}
          <span className="units">%</span>
        </h1>
      </div>

      <div className="row cont">
        <h1 className="txt-head-dash "> Total Bag</h1>
        <h2>as of May 15,2023</h2>
        <div className="divider"></div>
        <h1 className="txt-bags" id="total_bags">
          <img
            className="responsive-icon"
            src={DarkTheme ? darkIconbag : iconbag}
            alt="Temperature Icon"
          />
          {bags}
        </h1>
      </div>
      <div className="row cont">
        <h1 className="txt-head-dash "> Yield Predicted</h1>
        <h2>May 15, 2023</h2>
        <div className="divider"></div>
        <h1 className="txt-yield" id="yield">
          <img
            className="responsive-icon yieldIcon"
            src={DarkTheme ? darkIconyield : iconyield}
            alt="Temperature Icon"
          />
          40-43
          <span className="units">g</span>
        </h1>
      </div>
      <div className="row headerTemp">
        <Analytics chart_ii />
      </div>
      <div className="row squareBags">
        <Analytics chart_i />
      </div>
      <div className="row squareBags">
        <Analytics chart_iii></Analytics>
      </div>
    </div>
  );
};

export default Content;
