import "../styles/CurrentWeather.css";
import WindIcon from "./WindIcon";
import { IWeather } from "../utils/interfaces";
import getWindDescription from "../utils/getWindDescription";

interface CurrentWeatherProps {
  weather: IWeather;
}

export default function CurrentWeather(
  props: CurrentWeatherProps
): JSX.Element {
  return (
    <div className="CurrentWeather">
      <h4>Current Weather</h4>
      {props.weather && (
        <div className="CurrentWeather-container">
          <span className="CurrentWeather-temperature">
            {props.weather && Math.round(props.weather.main.temp - 273.15)} °C
          </span>
          <div className="CurrentWeather-WindIcon">
            <WindIcon
              windSpeed={props.weather.wind.speed}
              windDirection={props.weather.wind.deg}
            />
          </div>
        </div>
      )}
      {props.weather && (
        <>
          <p>
            Feels Like: {Math.round(props.weather.main.feels_like - 273.15)} °C
          </p>
          <p>
            {getWindDescription(
              props.weather.wind.speed,
              props.weather.wind.deg
            )}
          </p>
          <p style={{ textTransform: "capitalize" }}>
            {props.weather.weather[0].description}
          </p>
        </>
      )}
    </div>
  );
}
