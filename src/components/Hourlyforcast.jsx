import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow, Wind, CloudLightning, CloudFog } from "lucide-react";

const Hourlyforcast = ({ hourlyforcast }) => {
  // Function to map weather conditions to Lucide icons
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <Sun className="w-8 h-8 dark:text-white" />;
      case "Clouds":
        return <Cloud className="w-8 h-8 dark:text-white" />;
      case "Rain":
        return <CloudRain className="w-8 h-8 dark:text-white" />;
      case "Snow":
        return <CloudSnow className="w-8 h-8 dark:text-white" />;
      case "Thunderstorm":
        return <CloudLightning className="w-8 h-8 dark:text-white" />;
      case "Drizzle":
        return <CloudRain className="w-8 h-8 dark:text-white" />;
      case "Mist":
      case "Fog":
        return <CloudFog className="w-8 h-8 dark:text-white" />;
      case "Haze":
        return <Cloud className="w-8 h-8 dark:text-white" />;
      case "Dust":
      case "Sand":
        return <Cloud className="w-8 h-8 dark:text-white" />;
      case "Ash":
        return <Cloud className="w-8 h-8 dark:text-white" />;
      case "Squall":
        return <CloudRain className="w-8 h-8 dark:text-white" />;
      case "Tornado":
        return <Wind className="w-8 h-8 dark:text-white" />;
      default:
        return <Wind className="w-8 h-8 dark:text-white" />;
    }
  };
  
  

  return (
    <div className="md:h-[186px] md:w-full w-full  border rounded-2xl p-6 dark:text-[#A3A3A3] dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626]">

      <div className="flex justify-between">
        {hourlyforcast.slice(0, 6).map((hour, index) => (
          <div key={index} className="flex flex-col items-center text-center justify-between h-[135px]">
            <span className="text-sm">
              {index === 0
                ? "Now"
                : `${new Date(hour.dt * 1000).getHours() % 12 || 12} ${
                    new Date(hour.dt * 1000).getHours() >= 12 ? "PM" : "AM"
                  }`}
            </span>
            {getWeatherIcon(hour.weather[0].main)}
            <span className="text-sm dark:text-white">{Math.round(hour.main.temp)}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hourlyforcast;
