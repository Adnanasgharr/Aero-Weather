import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow, Wind } from "lucide-react"; // Import Lucide icons

const Daysforecast = ({ forecast }) => {
  const getWeatherIcon = (iconCode) => {
    // Map OpenWeatherMap icon codes to Lucide icons
    switch (iconCode) {
      case "01d":
      case "01n":
        return <Sun className="w-8 h-8" />;
      case "02d":
      case "02n":
        return <Cloud className="w-8 h-8" />;
      case "03d":
      case "03n":
        return <Cloud className="w-8 h-8" />;
      case "04d":
      case "04n":
        return <Cloud className="w-8 h-8" />;
      case "09d":
      case "09n":
        return <CloudRain className="w-8 h-8" />;
      case "10d":
      case "10n":
        return <CloudRain className="w-8 h-8" />;
      case "11d":
      case "11n":
        return <Wind className="w-8 h-8" />;
      case "13d":
      case "13n":
        return <CloudSnow className="w-8 h-8" />;
      case "50d":
      case "50n":
        return <Cloud className="w-8 h-8" />;
      default:
        return <Sun className="w-8 h-8" />; // Default icon if no match
    }
  };

  return (
    <div className="md:h-[500px] xl:w-[300px] md:w-full w-full border rounded-2xl p-6 dark:text-[#A3A3A3] dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626]">
      <h2 className="text-lg font-semibold mb-8">6-Day Forecast</h2>
      <div className="space-y-4">
        {forecast.map((day, index) => {
          const dayName = new Date(day.date).toLocaleDateString("en-US", {
            weekday: "short",
          });
          const tempHigh = Math.max(...day.data.map((d) => d.main.temp_max));
          const tempLow = Math.min(...day.data.map((d) => d.main.temp_min));
          const icon = day.data[0].weather[0].icon; // Example: "10d"

          return (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-700 pb-4"
            >
              <div className="flex items-center justify-between w-[72px]">
                <span className="text-sm ">{dayName}</span>
                {getWeatherIcon(icon)} {/* Use the Lucide icon based on the weather condition */}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center md:w-24 w-32 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-blue-500"
                    style={{
                      width: `${((tempHigh - tempLow) / tempHigh) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="text-sm dark:text-white">
                  {Math.round(tempLow)}° / {Math.round(tempHigh)}°
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Daysforecast;
