import React from "react";
import { Eye } from "lucide-react";

const Visibility = ({ visibility }) => {
  const getVisibilityDescription = (visibility) => {
    if (visibility >= 10) return "It's perfectly clear right now";
    if (visibility >= 5) return "Moderate visibility, some haze";
    return "Low visibility, foggy conditions";
  };

  return (
    <div className="md:h-[186px] xl:w-[250px] md:w-full w-full h-[46vw] border rounded-2xl md:p-6 p-4 dark:text-[#A3A3A3] dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626]">
      <div className="flex items-center">
        <Eye className="mr-2" size={16} strokeWidth={2.5} />
        <h1>Visibility</h1>
      </div>
      <div className="flex items-center  mt-4">
        <p className="text-[5vw] md:text-lg font-semibold dark:text-white">
          {Math.round(visibility)} km
        </p>
      </div>
      <div>
        <div className="mt-6">
          <p className=" text-black md:text-sm text-[3.5vw] dark:text-white">{getVisibilityDescription(visibility)}</p>
        </div>
      </div>
    </div>
  );
};

export default Visibility;
