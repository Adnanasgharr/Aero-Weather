import React from 'react';
import { Gauge } from 'lucide-react';

const Pressure = ({ pressure, description }) => {
  // Function to determine pressure description in simple English
  const getPressureDescription = (pressure, description) => {
    if (pressure >= 1030) {
      // Very high pressure
      if (description === 'Clear') {
        return "Very high pressure. Expect sunny and calm weather.";
      } else if (description === 'Rain') {
        return "Very high pressure with rain. Light showers possible.";
      } else if (description === 'Snow') {
        return "Very high pressure with snow. Light snow possible.";
      } else if (description === 'Clouds') {
        return "Very high pressure. Mostly cloudy with occasional breaks.";
      } else {
        return "Very high pressure. Weather conditions may vary.";
      }
    } else if (pressure >= 1020 && pressure < 1030) {
      // High pressure
      if (description === 'Clear') {
        return "High pressure. Expect clear skies and nice weather.";
      } else if (description === 'Rain') {
        return "High pressure with rain. Light rain possible.";
      } else if (description === 'Snow') {
        return "High pressure with snow. Light snow possible.";
      } else if (description === 'Clouds') {
        return "High pressure. Partly cloudy with a chance of light rain.";
      } else {
        return "High pressure. Weather conditions may vary.";
      }
    } else if (pressure >= 1010 && pressure < 1020) {
      // Moderate pressure
      if (description === 'Clear') {
        return "Moderate pressure. Mostly sunny with some clouds.";
      } else if (description === 'Rain') {
        return "Moderate pressure. Light rain or drizzle expected.";
      } else if (description === 'Snow') {
        return "Moderate pressure. Light snow or flurries possible.";
      } else if (description === 'Clouds') {
        return "Moderate pressure. Cloudy with a chance of light rain.";
      } else {
        return "Moderate pressure. Weather conditions may vary.";
      }
    } else if (pressure >= 1000 && pressure < 1010) {
      // Low pressure
      if (description === 'Clear') {
        return "Low pressure. Cloudy skies with a chance of rain.";
      } else if (description === 'Rain') {
        return "Low pressure. Rain or showers expected.";
      } else if (description === 'Snow') {
        return "Low pressure. Snow or snow showers likely.";
      } else if (description === 'Clouds') {
        return "Low pressure. Overcast with rain or snow possible.";
      } else {
        return "Low pressure. Weather conditions may vary.";
      }
    } else if (pressure >= 990 && pressure < 1000) {
      // Very low pressure
      if (description === 'Rain') {
        return "Very low pressure. Heavy rain and storms likely.";
      } else if (description === 'Snow') {
        return "Very low pressure. Heavy snowstorms expected.";
      } else if (description === 'Clouds') {
        return "Very low pressure. Stormy with heavy rain or snow.";
      } else {
        return "Very low pressure. Weather conditions may vary.";
      }
    } else if (pressure < 990) {
      // Extremely low pressure
      if (description === 'Rain') {
        return "Extremely low pressure. Severe storms and heavy rain.";
      } else if (description === 'Snow') {
        return "Extremely low pressure. Blizzard conditions likely.";
      } else if (description === 'Clouds') {
        return "Extremely low pressure. Intense storms with heavy rain or snow.";
      } else {
        return "Extremely low pressure. Weather conditions may vary.";
      }
    }
    return "Pressure data unavailable.";
  };

  return (
    <div className="md:h-[186px] xl:w-[250px] md:w-full w-full h-[46vw] border rounded-2xl md:p-6 p-4 dark:text-[#A3A3A3] dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626]">
      <div className="flex items-center">
        <Gauge className="mr-2" size={16} strokeWidth={2.5} />
        <h1>Pressure</h1>
      </div>
      <div className="flex items-center mt-4">
        <p className="text-[5vw] md:text-lg font-semibold dark:text-white">{pressure} hPa</p>
      </div>
      <div>
        <div className="mt-5 md:mt-6">
          <p className=" text-black md:text-sm text-[3.5vw] dark:text-white">
            {getPressureDescription(pressure, description)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pressure;