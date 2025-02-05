import React from "react";
import { SunDim } from "lucide-react";

const Sunset = ({ uvIndex }) => {
  const uvValue = Math.round(uvIndex);

  let uvLevel = "";

  if (uvValue <= 2) {
    uvLevel = "Low";
  } else if (uvValue >= 3 && uvValue <= 5) {
    uvLevel = "Moderate";
  } else if (uvValue >= 6 && uvValue <= 7) {
    uvLevel = "High";
  } else if (uvValue >= 8 && uvValue <= 10) {
    uvLevel = "Very High";
  } else if (uvValue >= 11) {
    uvLevel = "Extreme";
  }

  const calculatePosition = (value) => {
    if (value <= 2) {
      return (value / 2) * 20;
    } else if (value <= 5) {
      return ((value - 2) / 3) * 20 + 20;
    } else if (value <= 7) {
      return ((value - 5) / 3) * 20 + 40;
    } else if (value <= 10) {
      return ((value - 7) / 3) * 20 + 60;
    } else {
      return 100;
    }
  };

  const sliderPosition = calculatePosition(uvValue);

  return (
    <div className="md:h-[186px] xl:w-[250px] md:w-full w-full h-[46vw] border rounded-2xl md:p-6 p-4 dark:text-[#A3A3A3] dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626]">
      <div className="flex items-center">
        <SunDim className="mr-2" size={18} />
        <h1>UV Index</h1>
      </div>
      <div className="flex flex-col mt-4 md:mt-4 sm:mt-10">
        <p className="md:text-lg text-[5vw] font-semibold dark:text-white">{uvValue}</p>
        <p className="md:text-lg text-[5vw] font-semibold pb-3 dark:text-white">{uvLevel}</p>
      </div>
      <div>
        <div className="relative w-full max-w-md h-3 rounded-full bg-black">
          <div
            className="absolute top-0 left-0 h-3 w-full rounded-full"
            style={{
              background:
                "linear-gradient(to right, #4a90e2, #7ed321, #f8e71c, #f5a623, #d0021b)",
            }}
          ></div>
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full border border-gray-300 shadow-md"
            style={{
              left: uvValue >= 11 ? 'calc(100% - 20px)' : `${sliderPosition}%`,
              transition: "left 0.3s ease-in-out",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Sunset;