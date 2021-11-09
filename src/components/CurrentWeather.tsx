import "../styles/Currentweather.css";
import WindIcon from "./WindIcon";
interface IWeather {
  temperature: number;
  windSpeed: number;
  windDirection: number;
  description: string;
}

interface Props {
  weather: IWeather;
}

function CurrentWeather(props: Props) {
  return (
    <div className="CurrentWeather">
      <p>Current Weather</p>
      <div className="CurrentWeather-container">
        <span className="CurrentWeather-temperature">
          {props.weather.temperature} °C
        </span>
        <div className="CurrentWeather-WindIcon">
          <WindIcon
            windSpeed={props.weather.windSpeed}
            windDirection={props.weather.windDirection}
          />
        </div>
      </div>
      {/* <p>Feels Like: {weather.feelsLike} °C</p>
        <p>Wind Speed: {weather.windSpeed} mph</p>
        <p>Wind Direction: {weather.windDirection} degrees</p> */}
      <p>Description: {props.weather.description}</p>
    </div>
  );
}

export default CurrentWeather;
