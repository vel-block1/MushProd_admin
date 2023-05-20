import { useContext, useState, useEffect } from "react";

import { getDatabase, ref, onValue } from "firebase/database";

const GetTemp = (date) => {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");

  const realtimeDB = getDatabase();

  useEffect(() => {
    const getCurrentData = async () => {
      const getDateOnTemp = ref(realtimeDB, `${date}`);

      onValue(getDateOnTemp, (snapshot) => {
        if (snapshot.exists()) {
          let hasExecuted = false;

          snapshot.forEach((childSnapshot) => {
            if (!hasExecuted) {
              const childKey = childSnapshot.key;
              const childData = childSnapshot.val();
              const childHumidity = childData.Humd;
              const childTemperature = childData.Temp;

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
  }, [date]);

  return {
    temperature,
    humidity,
  };
};

export default GetTemp;
