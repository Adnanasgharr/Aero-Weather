import React from "react";
import { RiVirusLine } from "@remixicon/react";

const AirPoll = ({ airpoll }) => {
  const getAirQuality = (aqi) => {
    const levels = {
      1: "Good",
      2: "Fair",
      3: "Moderate",
      4: "Poor",
      5: "Very Poor",
    };
    return levels[aqi] || "Unknown";
  };

  const calculatePosition = (aqi) => {
    if (!aqi) return "0%";
    // Make sure the position stays within 0% to 95% (for a 5-point scale)
    return `${Math.min((aqi - 1) * 25, 95)}%`; // Map AQI (1-5) to slider position
  };

  const airQualityText = getAirQuality(airpoll);
  const sliderPosition = calculatePosition(airpoll);

  return (
    <div className="md:h-[186px] md:w-full xl:h-[186px] xl:w-full w-full border rounded-2xl p-6 dark:text-[#A3A3A3] dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626]">
      <div className="flex items-center gap-2"><RiVirusLine size={18}/> 
      <h1>Air pollution</h1>
      
      </div>
        
     
 
      <div className="pt-7">
        {/* Gradient Bar */}
        <div className="relative w-full  h-3 rounded-full bg-black">
          {/* Gradient background */}
          <div
            className="absolute top-0 left-0 h-3 w-full rounded-full"
            style={{
              background:
                "linear-gradient(to right, #4a90e2, #7ed321, #f8e71c, #f5a623, #d0021b)",
            }}
          ></div>
          {/* Indicator with smooth transition */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full border border-gray-300 shadow-md"
            style={{
              left: sliderPosition,
              transition: "left 0.3s ease-in-out", // Smooth transition
            }}
          ></div>
        </div>
 
        {/* Air Quality Description */}
        <p className="text-sm sm:text-base md:text-sm  text-black dark:text-white pt-8">{`Air quality is ${airQualityText}.`}</p>
      </div>
    </div>
  );
};

export default AirPoll;
