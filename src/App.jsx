import React, { useEffect, useState } from "react";
import Temperature from "./components/Temperature";
import AirPoll from "./components/AirPoll";
import Daysforecast from "./components/Daysforecast";
import Sunset from "./components/Sunset";
import axios from "axios";
import Windcompass from "./components/Windcompass";
import Uvindex from "./components/Uvindex";
import Feelslike from "./components/Feelslike";
import Humidity from "./components/Humidity";
import Visibility from "./components/Visibility";
import Pressure from "./components/Pressure";
import Hourlyforcast from "./components/Hourlyforcast";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Dropdownn from "./components/Dropdownn";
import { CodeXml, Github, Heart } from "lucide-react";
import Precipitation from "./components/Precipitation";
import { RiGithubFill, RiLinkedinBoxFill } from "@remixicon/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("karachi"); // State for the city to search
  const [inputCity, setInputCity] = useState(""); // State for the input field
  const [searchedCity, setSearchedCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [temphi, setTemphi] = useState(null);
  const [templw, setTemplw] = useState(null);
  const [description, setDescription] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [direction, setDirection] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [feels, setFeels] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [hourlyforcast, setHourlyforcast] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [airpoll, setAirpoll] = useState(null);
  const [error, setError] = useState("");
  const [activeLayer, setActiveLayer] = useState("clouds"); // State for selected layer
  const [precipitation, setPrecipitation] = useState(null);
  const [timezone, setTimezone] = useState(null);

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      return;
    }

    setError(""); // Clear previous errors
    const api_key = import.meta.env.VITE_WEATHER_API_KEY;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      );

      setWeatherData(response.data);
      setSearchedCity(city);
      console.log(response.data);
      setTemp(Math.round(response.data.main.temp));
      setTemphi(Math.round(response.data.main.temp_max));
      setTemplw(Math.round(response.data.main.temp_min));
      setDescription(response.data.weather[0].main);
      setSunset(response.data.sys.sunset);
      setSunrise(response.data.sys.sunrise);
      setSpeed(response.data.wind.speed);
      setDirection(response.data.wind.deg);
      setFeels(response.data.main.feels_like);
      setHumidity(response.data.main.humidity);
      setPressure(response.data.main.pressure);
      setVisibility(response.data.visibility / 1000);
      setTimezone(response.data.timezone);

      const { lat, lon } = response.data.coord;
      setLat(lat);
      setLon(lon);

      // Fetch air pollution data
      const airPollResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`
      );
      setAirpoll(airPollResponse.data.list[0].main.aqi);

      const precipitation =
        response.data?.rain?.["1h"] || response.data?.snow?.["1h"] || 0;
      setPrecipitation(precipitation);
      console.log(precipitation);

      // Fetch UV index data
      const uvResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${api_key}`
      );
      setUvIndex(uvResponse.data.value);

      // Fetch hourly forecast data
      const hourlyResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric`
      );
      setHourlyforcast(hourlyResponse.data.list);

      // Fetch 5-day forecast data
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric`
      );
      const groupedForecast = groupForecastByDay(forecastResponse.data.list);
      setFiveDayForecast(groupedForecast);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("City not found or API error. Please try again.");
    }
    setInputCity(""); // Clear input field after search
  };

  const groupForecastByDay = (forecastList) => {
    const days = {};
    forecastList.forEach((item) => {
      const date = new Date(item.dt_txt).toLocaleDateString();
      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(item);
    });

    return Object.entries(days).map(([date, data]) => ({
      date,
      data,
    }));
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]); // Fetch weather data when city changes

  const handleSearch = () => {
    setCity(inputCity); // Set the city state to trigger the useEffect
  };

  const layers = {
    clouds:
      "https://tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=9505fd1df737e20152fbd78cdb289b6a",
    temperature:
      "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=9505fd1df737e20152fbd78cdb289b6a",
    wind: "https://tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid=9505fd1df737e20152fbd78cdb289b6a",
  };
  return (
    <div className="px-2">
      {/* Navbar (unchanged) */}
      <div className="flex items-center justify-end mb-6 border-b-[1px] fixed top-0 left-0 right-0 border-[#F4F4F5] dark:border-[#262626] bg-transparent bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-4 sm:px-6 py-2 sm:py-3 z-50">
        <input
          className="dark:text-[#A3A3A3] mr-2 bg-transparent bg-[#F4F4F5] dark:border-[#262626] border px-2 sm:px-3 py-1 focus:outline-none rounded-md w-40 sm:w-48 xl:w-64 lg:w-72"
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search city..."
        />
        <button
          className="bg-blue-700 text-white px-2 sm:px-3 py-1 text-sm sm:text-base dark:bg-[#27272A] rounded-md shadow-xl hover:bg-blue-800"
          onClick={handleSearch}
        >
          Search
        </button>
        <Dropdownn className="ml-2 sm:ml-3" />
        <a
          href="https://github.com/Adnanasgharr/Aero-Weather"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-2 sm:px-3 py-1 rounded text-sm sm:text-base text-white bg-black dark:bg-white dark:text-black ml-2 sm:ml-3 hidden sm:flex sm:gap-2">
            <RiGithubFill />
            Support Project
          </button>
        </a>
      </div>
      <div className="flex flex-col md:flex-row lg:w-full xl:flex-row gap-2 mt-20">
        {/* Left Column - Temperature and Forecast */}
        <div className="flex gap-2 flex-col w-full xl:w-auto">
          <Temperature
            city={searchedCity}
            temp={temp}
            temphi={temphi}
            templw={templw}
            description={description}
            timezone={timezone}
          />

          {/* Sunset, Wind, and UV Index (Mobile Only) */}
          <div className="grid grid-cols-2 gap-2 xl:hidden">
            <Sunset sunset={sunset} sunrise={sunrise} />
            <Windcompass speed={speed} direction={direction} />
            <Precipitation
              precipitation={precipitation}
              description={description}
            />
            <Uvindex uvIndex={uvIndex} />
          </div>

          <Daysforecast forecast={fiveDayForecast} />
        </div>
        {/* Right Column - Weather Details */}
        <div className="flex flex-col xl:flex-row gap-2 flex-wrap w-full">
          {/* Air Quality and Hourly Forecast */}
          <div className="h-auto xl:h-[380px] w-full md:h-[380px] md:w-full xl:w-[506px] flex gap-2 flex-col">
            <AirPoll airpoll={airpoll} />
            <Hourlyforcast hourlyforcast={hourlyforcast} />
          </div>

          {/* Sunset, Wind, and UV Index */}
          <div className="hidden xl:flex xl:flex-wrap  xl:h-[380px] xl:w-[510px] xl:flex-row md:w-full gap-2 ">
            <Windcompass speed={speed} direction={direction} />
            <Precipitation
              precipitation={precipitation}
              description={description}
            />
            <Sunset sunset={sunset} sunrise={sunrise} />
            <Uvindex uvIndex={uvIndex} />
          </div>

          {/* Weather Metrics */}
          <div className="xl:flex  xl:flex-row grid grid-cols-2 gap-2 md:w-full w-full">
            <Feelslike feels={Math.round(feels)} temp={temp} />
            <Humidity humidity={humidity} />
            <Visibility visibility={visibility} />
            <Pressure pressure={pressure} description={description} />
          </div>
          {/* xl:h-[380px] xl:w-[510px] */}

          {/* Map Container */}
          <div className="relative h-[308px] w-full xl:w-[765px] border rounded-2xl overflow-hidden dark:text-[#A3A3A3] dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626]">
            {/* Layer Toggle Dropdown */}
            <div
              className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg"
              style={{ zIndex: 1000 }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 xl:mb-2">
                Select Layer
              </label>
              <select
                value={activeLayer}
                onChange={(e) => setActiveLayer(e.target.value)}
                className="block xl:w-48 xl:px-4 px-2 xl:py-2 py-1 bg-gray-200 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="clouds">Clouds</option>
                <option value="temperature">Temperature</option>
                <option value="wind">Wind</option>
              </select>
            </div>

            {lat && lon && (
              <MapContainer
                center={[lat, lon]}
                zoom={10}
                className="h-full w-full"
                key={`${lat}-${lon}`}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {activeLayer && (
                  <TileLayer
                    url={layers[activeLayer]}
                    attribution="&copy; OpenWeatherMap contributors"
                  />
                )}
                <Marker position={[lat, lon]}>
                  <Popup>
                    {searchedCity} <br /> Lat: {lat}, Lon: {lon}
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </div>

          {/* Major Cities */}
          <div className="h-auto xl:h-[300px] w-full xl:w-[250px] mt-1">
            <h2 className="text-lg font-semibold xl:pt-4  dark:text-white">
              Weather in Major Cities
            </h2>
            <div className="xl:flex xl:flex-col grid grid-cols-2 gap-2 mt-2">
              {["New York", "London", "Karachi", "Tokyo"].map((cityName) => (
                <button
                  key={cityName}
                  className="w-full py-4 rounded-lg dark:hover:bg-[#27272A] transition border hover:bg-[#E5E7EB] dark:text-white dark:bg-[#0A0A0A] bg-[#F4F4F5] dark:border-[#262626]"
                  onClick={() => setCity(cityName.toLowerCase())}
                >
                  {cityName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pt-4 pb-1">
        <p className="text-[#505050] flex items-center gap-1">
          <CodeXml size={16} /> with <Heart size={16} /> by{" "}
          <a
            href="https://www.linkedin.com/in/adnan-asghar-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#505050] hover:underline"
          >
            Adnan Asghar{" "}
          </a>
          <RiLinkedinBoxFill size={20} />
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 mt-4">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default App;
