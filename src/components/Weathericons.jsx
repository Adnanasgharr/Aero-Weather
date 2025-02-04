import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Haze } from 'lucide-react';

const Weathericons = ({ weather }) => {
  const getWeatherIcon = () => {
    switch (weather) {
      case 'Clear':
        return <Sun className="w-12 h-12 dark:text-white" />;
      case 'Clouds':
        return <Cloud className="w-12 h-12" />;
      case 'Rain':
        return <CloudRain className="w-12 h-12" />;
      case 'Snow':
        return <CloudSnow className="w-12 h-12" />;
      case 'Wind':
        return <Wind className="w-12 h-12" />;
      case 'Haze':
        return <Haze className="w-12 h-12" />;
    
      default:
        return <Sun className="w-12 h-12" />; // Default icon
    }
  };

  return <div>{getWeatherIcon()}</div>;
};

export default Weathericons;
