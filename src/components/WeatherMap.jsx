import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WeatherMap = ({ lat, lon }) => {
  const apiKey = "9505fd1df737e20152fbd78cdb289b6a"; // Replace with your actual API key

  console.log(lat, lon); // Log to check if lat/lon are correct

  // Default center if lat and lon are not provided
  const defaultCenter = [20.5937, 78.9629]; // Center of India
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  useEffect(() => {
    if (lat && lon) {
      setMapCenter([lat, lon]);
    }
  }, [lat, lon]);

  return (
    <div className="h-[500px] w-full rounded-xl shadow-lg border border-gray-200">
      {/* Add a key to force re-render when lat and lon change */}
      <MapContainer
        key={`${lat}-${lon}`} // Use lat and lon as part of the key
        center={mapCenter}
        zoom={8}
        className="h-full w-full"
      >
        {/* Base Map Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Precipitation Overlay */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=${apiKey}`}
          attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
        />

        {/* Clouds Overlay */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=${apiKey}`}
          attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
        />
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
