import React from 'react';
import { CloudRain, CloudSnow } from 'lucide-react';

const Precipitation = ({ precipitation, description }) => {
  // Function to determine precipitation description
  const getPrecipitationDescription = (precipitation) => {
    if (precipitation === 0) {
      return "No precipitation expected.";
    } else if (precipitation > 0 && precipitation <= 2.5) {
      return "Light precipitation expected.";
    } else if (precipitation > 2.5 && precipitation <= 7.5) {
      return "Moderate precipitation expected.";
    } else if (precipitation > 7.5) {
      return "Heavy precipitation expected.";
    }
    return "Precipitation data unavailable.";
  };

  // Function to get the appropriate icon based on precipitation type
  const getPrecipitationIcon = (description) => {
    if (description === 'Snow') {
      return <CloudSnow className="mr-2" size={16} strokeWidth={2.5} />;
    }
    return <CloudRain className="mr-2" size={16} strokeWidth={2.5} />;
  };

  return (
    <div className="md:h-[186px] xl:w-[250px] md:w-full w-full h-[46vw] border rounded-2xl md:p-6 p-4 dark:text-[#A3A3A3] dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626]">
      <div className="flex items-center">
        {getPrecipitationIcon(description)}
        <h1>Precipitation</h1>
      </div>
      <div className="flex items-center mt-4 md:mt-4 sm:mt-12">
        <p className="md:text-lg text-[5vw] font-semibold dark:text-white">
          {precipitation} mm
        </p>
      </div>
      <div className="mt-6">
        <p className="text-sm text-black md:text-sm text-[3.5vw] dark:text-white">
          {getPrecipitationDescription(precipitation)}
        </p>
      </div>
    </div>
  );
};

export default Precipitation;