import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/Weather.css";
import CurrentWeather from "./CurrentWeather";
import { IWeather } from "../utils/interfaces";
// import { GEO_API_BASE_URL, GEO_API_KEY } from "../utils/APIFragments";
interface WeatherProps {
  weather: IWeather | undefined;
  location: string;
  setLocation: (locationName: string) => void;
}

export default function Weather(props: WeatherProps) {
  const [coordinates, setCoordinates] = useState<number[]>([]);

  //   const [forecast, setForecast] = useState<IForecast>();

  //   // Get Location Name from Coordinates
  //   const getLocationFromCoordinates = async (lat: number, long: number) => {
  //     axios
  //       .get(
  //         `${GEO_API_BASE_URL}${coordinates[1]},${coordinates[0]}${GEO_API_KEY}`
  //       )
  //       .then(
  //         (res: any) =>
  //           `${res.data.features[0].context[2].text}, ${res.data.features[0].context[3].text}`
  //       )
  //       .then((locationName: string) => {
  //         props.setLocation(locationName);
  //         console.log(locationName);
  //       });
  //   };

  //   'Get my current location' coordinates from browser
  const getCoords = async () => {
    const pos: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return pos;
  };

  //   const getCurrentLocationCoordinates = async () => {
  //     const get = await getCoords();
  //     const successfullySetCoords = await setCoordinates([
  //       get.coords.latitude,
  //       get.coords.longitude,
  //     ]);
  //     await getLocationFromCoordinates(get.coords.latitude, get.coords.longitude);
  //     console.log("I now have the coordinates back, they are", coordinates);
  //   };

  //   useEffect(() => {
  //     getLocationFromCoordinates();
  //     console.log("useEffect is firing");
  //   }, [coordinates]);

  //   if (props.location !== "") {
  //     axios
  //       .get(`${GEO_API_BASE_URL}${props.location}${GEO_API_KEY}`)
  //       .then((res) => console.log(res.data));
  //   }

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
      <button
      //   onClick={() => getCurrentLocationCoordinates()}
      >
        Get my current location
      </button>
      {props.weather !== undefined && (
        <CurrentWeather weather={props.weather} />
      )}
      {/* <Forecast forecast={{ ...forecast }} />  */}
    </div>
  );
}
