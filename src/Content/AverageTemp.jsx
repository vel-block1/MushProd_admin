import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { getDatabase, ref, onValue, get } from "firebase/database";

const AverageTemp = () => {
  const [data, setData] = useState([]);
  const [averages, setAverages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = firebase.database();
        const snapshot = await db.ref("date").once("value");

        const dateData = snapshot.val();

        // Extract each date's randomID data and calculate averages
        const extractedData = Object.entries(dateData).map(
          ([date, randomIDs]) => {
            const randomIDData = Object.values(randomIDs);

            const tempSum = randomIDData.reduce(
              (sum, item) => sum + item.temp,
              0
            );
            const humidSum = randomIDData.reduce(
              (sum, item) => sum + item.humid,
              0
            );

            const tempAvg = tempSum / randomIDData.length;
            const humidAvg = humidSum / randomIDData.length;

            return {
              date,
              tempAvg,
              humidAvg,
            };
          }
        );

        // Update the state with the extracted data
        setData(extractedData);

        // Extract only the average values for displaying in the UI
        const averageValues = extractedData.map(({ tempAvg, humidAvg }) => ({
          tempAvg,
          humidAvg,
        }));

        // Update the state with the average values
        setAverages(averageValues);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Firebase</h1>
      <ul>
        {data.map(({ date, tempAvg, humidAvg }) => (
          <li key={date}>
            Date: {date}, Temp Avg: {tempAvg}, Humidity Avg: {humidAvg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AverageTemp;
