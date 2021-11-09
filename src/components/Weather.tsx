import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  location: string;
  setLocation: (locationName: string) => void;
}

// interface IForecast {}

// interface IWeather {}

// Weather API docs: https://openweathermap.org/current
const WEATHER_API_BASE_URL =
  "http://api.openweathermap.org/data/2.5/weather?q=";
const WEATHER_API_KEY = "&appid=2aeb3fa9d22eee3b7631e9db2332118e";

const WEATHER_FORECAST_API_BASE_URL =
  "http://api.openweathermap.org/data/2.5/onecall?";

const GEO_API_BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const GEO_API_KEY =
  ".json?access_token=pk.eyJ1IjoiZWRoYWxsaXdlbGwiLCJhIjoiY2trdXozZ2N4MWNyaDJ2cGMweWRvcDk1ZiJ9.ExEuJTASuQGJOm2oDnGSjw";

const GEO_CODING_BASE_URL = "http://api.openweathermap.org/geo/1.0/reverse?";

export default function Weather(props: Props) {
  const [coordinates, setCoordinates] = useState<number[]>([]);
  //   const [weather, setWeather] = useState<IForecast>();
  //   const [forecast, setForecast] = useState<IForecast>();

  const getCoords = async () => {
    const pos: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    setCoordinates([pos.coords.longitude, pos.coords.latitude]);
  };
  getCoords();

  const getLocationFromAPI = async () => {
    const geocodingResponse = await axios.get(
      `${GEO_CODING_BASE_URL}lat=${coordinates[0]}&lon=${coordinates[1]}&limit=1${WEATHER_API_KEY}`
    );
    const locationName = geocodingResponse.data[0].name;
    // With that location name, make a call to the weather API to fetch data
    props.setLocation(locationName);
  };
  getLocationFromAPI();

  useEffect(() => {
    if (props.location) {
      axios
        .get(`${GEO_API_BASE_URL}${props.location}${GEO_API_KEY}`)
        .then((res) => console.log(res.data));
    }
  }, [props.location]);

  //   const fetchWeatherFromAPI = async () => {
  //     if (props.location !== prevProps.location) {
  //       let mapResponse = await axios.get(

  //       );
  //       let newCoordinates = mapResponse.data.features[0].geometry.coordinates;
  //       let weatherRes = await axios.get(
  //         `${WEATHER_API_BASE_URL}${this.props.location}${WEATHER_API_KEY}`
  //       );
  //       let weather = weatherRes.data;
  //       let forecastRes = await axios.get(
  //         `${WEATHER_FORECAST_API_BASE_URL}lat=${newCoordinates[0]}&lon=${newCoordinates[1]}&exclude=minutely,hourly${WEATHER_API_KEY}`
  //       );
  //       let newForecast = forecastRes.data.daily;
  //       // console.log(newForecast);
  //       this.setState({
  //         coordinates: newCoordinates,
  //         weather: {
  //           temperature: Math.round(weather.main.temp - 272),
  //           feelsLike: Math.round(weather.main.feels_like - 272),
  //           windSpeed: Math.round(weather.wind.speed),
  //           windDirection: weather.wind.deg,
  //           description: weather.weather[0].main,
  //         },
  //         forecast: { ...newForecast },
  //       });
  //     }
  //   };

  return (
    <div className="Weather">
      <h2 className="Weather-location">
        {props.location ? props.location : "Finding current location..."}
      </h2>
      {/* <CurrentWeather weather={{ ...weather }} />
      <Forecast forecast={{ ...forecast }} /> */}
    </div>
  );
}
