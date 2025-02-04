import React from "react";
import { Droplet } from "lucide-react";
import { RiContrastDropFill } from "@remixicon/react";

const Humidity = ({ humidity }) => {
  const getHumidityDescription = (humidity) => {
    if (humidity >= 80) return "High humidity, it might feel uncomfortable";
    if (humidity >= 50) return "Moderate humidity, fairly comfortable";
    return "Low humidity, dry conditions";
  }  


  return (
    <div className="md:h-[186px] xl:w-[250px] md:w-full w-full h-[46vw] border rounded-2xl md:p-6 p-4 dark:text-[#A3A3A3] dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626]">
      <div className="flex items-center gap-2">
        <RiContrastDropFill size={16} strokeWidth={2.5}/>
        <h1>Humidity</h1>
      </div>
      <div className="flex items-center  mt-4">
        <p className="text-[5vw] md:text-lg font-semibold dark:text-white">
          {Math.round(humidity)}°
        </p>
      </div>
      <div>
        <div className="mt-5 md:mt-6">
          <p className=" text-black md:text-sm text-[3.5vw] dark:text-white">{getHumidityDescription(humidity)} </p>
        </div>
      </div>
    </div>
  );
};

export default Humidity;













