import React from "react";
import { SunsetIcon } from "lucide-react"; // Using Lucide icon for sunset

const Sunset = ({ sunset, sunrise }) => {
  // Function to format the sunset time (assuming it's a UNIX timestamp)
  const formatTime = (time) => {
    if (!time) return "N/A";
    const date = new Date(time * 1000); // Convert from UNIX timestamp to Date
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formattedSunset = formatTime(sunset);
  const formattedSunrise = formatTime(sunrise);

  return (
    <div className="md:h-[186px] xl:w-[250px] md:w-full w-full h-[46vw] border rounded-2xl md:p-6 p-4 dark:text-[#A3A3A3] dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626]">
      <div className="flex items-center">
        <SunsetIcon className="mr-2" size={16} />
        <h1>Sunset</h1>
      </div>
      <div className="flex items-center md:mt-4 mt-4 sm:mt-12">
        <p className="md:text-lg text-[5vw] font-semibold dark:text-white">
          {formattedSunset}
        </p>
      </div>
      <div>
        <div className="flex items-center mt-9 ">
          <p className="md:text-sm text-[3.5vw] dark:text-white">
            Sunrise: {formattedSunrise}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sunset;
