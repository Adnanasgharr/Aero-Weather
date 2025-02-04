import React, { useEffect, useState } from "react"; 
import Weathericons from "./Weathericons";

const Temperature = ({ city, temp, temphi, templw, description, timezone }) => {
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Convert the current time to UTC and then add the timezone offset (in seconds)
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
      const cityTime = new Date(utcTime + timezone * 1000);

      // Format the day using the searched city's time
      const dayString = cityTime.toLocaleDateString(undefined, { weekday: "long" });
      setDay(dayString);

      // Format the time using the searched city's time
      const timeString = cityTime.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(timeString);
    };

    // Initialize time
    updateTime();
    
    // Update every second
    const intervalId = setInterval(updateTime, 1000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [timezone]);

  return (
    <div className="md:h-[380px] w-full md:w-full border rounded-2xl p-6 dark:text-[#A3A3A3] dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626]">
      <div className="flex items-center justify-between dark:text-white font-medium">
        <p>{day}</p>
        <p>{time}</p>
      </div>
      <p className="dark:text-white font-bold py-3 capitalize">{city}</p>
      <div className="text-center p-5">
        <h1 className="text-8xl font-bold dark:text-white">
          {temp !== null ? `${Math.round(temp)}°` : ""}
        </h1>
      </div>
      <div>
        {description && <Weathericons weather={description} />}
        <p className="capitalize font-medium dark:text-white py-1">{description || ""}</p>
        <div className="inline-flex gap-2 font-medium">
          <p>{temphi !== null ? `H: ${temphi}°` : ""}</p>
          <p>{templw !== null ? `L: ${templw}°` : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default Temperature;
