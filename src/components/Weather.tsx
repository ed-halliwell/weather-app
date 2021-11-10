import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/Weather.css";
import CurrentWeather from "./CurrentWeather";
import { IWeather } from "../utils/interfaces";
import { GEO_API_BASE_URL, GEO_API_KEY } from "../utils/APIFragments";
interface WeatherProps {
  weather: IWeather | undefined;
  location: string;
  setLocation: (locationName: string) => void;
}

export default function Weather(props: WeatherProps) {
  const [coordinates, setCoordinates] = useState<number[]>([]);
  //   const [forecast, setForecast] = useState<IForecast>();

  //   'Get my current location' coordinates from browser
  const handleMyLocation = async () => {
    const pos: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    setCoordinates([pos.coords.latitude, pos.coords.longitude]);
    console.log(coordinates);

    // Get Location Name from Coordinates
    function getLocationFromCoordinates(lat: number, long: number) {
      axios
        .get(`${GEO_API_BASE_URL}${lat},${long}${GEO_API_KEY}`)
        .then(
          (res: any) =>
            `${res.data.features[0].context[2].text}, ${res.data.features[0].context[3].text}`
        )
        .then((locationName: string) => {
          props.setLocation(locationName);
          console.log(locationName);
        });
    }
    getLocationFromCoordinates(coordinates[0], coordinates[1]);
  };

  //       let forecastRes = await axios.get(
  //         `${WEATHER_FORECAST_API_BASE_URL}lat=${newCoordinates[0]}&lon=${newCoordinates[1]}&exclude=minutely,hourly${WEATHER_API_KEY}`
  //       );
  //       let newForecast = forecastRes.data.daily;
  //       // console.log(newForecast);

  return (
    <div className="Weather">
      <div className="Weather-PlaceNameContainer">
        {props.location && (
          <h2 className="Weather-location">{props.location}</h2>
        )}
        {!props.location && (
          <h2 className="Weather-noLocation">Is it raining there?</h2>
        )}

        <button
          className="Weather-GetCurrentLocation"
          onClick={() => handleMyLocation()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
              fill="rgb(35, 48, 82)"
            />
          </svg>
        </button>
      </div>
      {props.weather !== undefined && (
        <CurrentWeather weather={props.weather} />
      )}
      {/* <Forecast forecast={{ ...forecast }} />  */}
    </div>
  );
}
