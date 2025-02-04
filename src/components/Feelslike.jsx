import React from "react";
import { Thermometer } from "lucide-react";

const Feelslike = ({ feels, temp }) => {
  // Function to determine feels-like description
  const getFeelsLikeDescription = (feels, temp) => {
    const difference = feels - temp;

    if (difference >= 3) return "Feels warmer than the actual temperature";
    if (difference <= -3) return "Feels colder than the actual temperature";
    return "Feels close to the actual temperature";
  };

  return (
    <div className="md:h-[186px] xl:w-[250px] md:w-full lg:w-full w-full h-[46vw] border rounded-2xl md:p-6 p-4 dark:text-[#A3A3A3] dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626]">
      <div className="flex items-center">
        <Thermometer className="mr-2" size={16} strokeWidth={2.5} />
        <h1 >
          Feels like
        </h1>
      </div>

      <div className="flex items-center mt-4">
        <p className="text-[5vw] md:text-lg font-semibold dark:text-white">
          {Math.round(feels)}°
        </p>
      </div>

      <div className="mt-6">
        <p className="md:text-sm text-[3.5vw] text-black dark:text-white">
          {getFeelsLikeDescription(feels, temp)}
        </p>
      </div>
    </div>
  );
};

export default Feelslike;
