import React from "react";
import { useState, useEffect } from "react";

const GetDate = () => {
  const [date, setDate] = useState("");

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
  return { date };
};

export default GetDate;
