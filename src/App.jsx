import { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    temp: "",
    max: "",
    min: "",
    feelsLike: "",
    country: "",
    w_type: "",
    humidity: "",
  });
  const [icon, setIcon] = useState("");
  const ICON_URL = `http://openweathermap.org/img/wn/`;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${
    import.meta.env.VITE_API_KEY
  }`;
  const getWeatherData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    let w_icon = ICON_URL + data.weather[0].icon + ".png";
    setIcon(w_icon);
    setWeather({
      temp: data.main.temp,
      max: data.main.temp_max,
      min: data.main.temp_min,
      feelsLike: data.main.feels_like,
      country: data.sys.country,
      w_type: data.weather[0].main,
      humidity: data.main.humidity,
    });
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1 className="heading">Weather App</h1>
          <button onClick={toggleDarkMode} className="dark-btn">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="input">

          <input
            type="text"
            placeholder="Enter Country Name"
            id="input"
            className="input-field"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
          />
          <button
            type="submit"
            className="submit-btn"
            onClick={(e) => {
              e.preventDefault();
              getWeatherData();
            }}
          >
            Submit
          </button>
        </div>
        <div className="weather-details">
          <p className="weather-data">
            Current Temperature is: {weather.temp}°C
          </p>
          <p className="weather-data">Max Temperature is: {weather.max}°C</p>
          <p className="weather-data">Min Temperature is: {weather.min}°C</p>
          <p className="weather-data">
            Temperature Feels like: {weather.feelsLike}°C
          </p>
          <p className="weather-data">Humidity level: {weather.humidity}</p>
          <p className="weather-data">Weather type: {weather.w_type}</p>
          <p className="weather-data">
            <img src={icon} />
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
