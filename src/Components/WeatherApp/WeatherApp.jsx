import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [city, setCity] = useState("London");
  const [wicon, setWicon] = useState(cloud_icon);
  const [inputCity, setInputCity] = useState("");

  const search = async () => {
    if (!inputCity) return;

    let URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${inputCity}&appid=0c52317be7672eab4dea15006ba3829e`;
    try {
      let response = await fetch(URL);
      let data = await response.json();

      if (data.cod === "404") {
        alert("City Not Found!!");
        return;
      }

      // Update state with new data
      setTemp(Math.floor(data.main.temp));
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCity(inputCity);

      // Update weather icon
      const icon = data.weather[0].icon;
      if (icon === "01d" || icon === "01n") setWicon(clear_icon);
      else if (icon === "02d" || icon === "02n") setWicon(cloud_icon);
      else if (icon === "03d" || icon === "03n") setWicon(drizzle_icon);
      else if (icon === "04d" || icon === "04n") setWicon(drizzle_icon);
      else if (icon === "09d" || icon === "09n") setWicon(rain_icon);
      else if (icon === "10d" || icon === "10n") setWicon(rain_icon);
      else if (icon === "13d" || icon === "13n") setWicon(snow_icon);
      else setWicon(clear_icon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input
          type="text"
          className='cityInput'
          placeholder='Search Your City Here'
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)} // Update input value
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="$" />
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon} alt="icon" />
      </div>
      <div className="weather-temp">{temp}°C</div>
      <div className="weather-location">{city}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{wind} Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
