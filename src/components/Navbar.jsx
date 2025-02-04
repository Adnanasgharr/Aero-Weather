import React, { useState } from "react";
import Dropdownn from "./Dropdownn";

const Navbar = () => {

  return (
    <div className="flex items-center justify-end mb-6">
     {/* <input
          className="dark:text-[#A3A3A3] dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626] border px-3 py-1 focus:outline-none rounded-md w-64"
          type="text"
          value={city}
          onChange={(e) => {setCity(e.target.value)
            console.log(e.target.value)
          }} // setCity should be passed as a prop here
          
          placeholder="Search city..."
        />

        <button className="bg-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-800" onClick={fetchWeatherData}>Search</button> */}
      <Dropdownn />

      <button className="px-3 py-1 rounded text-white bg-black dark:bg-white dark:text-black">
        Support Project
      </button>
    </div>
  );
};

export default Navbar;
