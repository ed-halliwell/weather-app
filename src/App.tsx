import { useState } from "react";
import SearchBox from "./components/SearchBox";
import Weather from "./components/Weather";
import "./styles/App.css";
import { PlaceNameContext, IWeather } from "./utils/interfaces";
import {
  GEO_API_BASE_URL,
  GEO_API_KEY,
  WEATHER_API_BASE_URL,
  WEATHER_API_KEY,
} from "./utils/APIFragments";

export default function App(): JSX.Element {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<IWeather>();

  const handleSearchSubmit = async (searchTerm: string) => {
    fetchFullPlaceName(searchTerm);
    fetchCurrentWeatherData(searchTerm);
  };

  const handleCurrentLocationClick = async (searchTerm: string) => {
    fetchCurrentWeatherData(searchTerm);
  };

  const fetchFullPlaceName = async (searchTerm: string) => {
    // fetch full placename
    fetch(`${GEO_API_BASE_URL}${searchTerm}${GEO_API_KEY}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Location not found");
        }
      })
      .then((res) => {
        const placeName = res.features[0].text;
        const contextArray = res.features[0].context;
        const placeObj = contextArray.find((a: PlaceNameContext) => {
          if (a.id.includes("place")) {
            return a.id;
          } else {
            return false;
          }
        });
        const countryObj = contextArray.find((a: PlaceNameContext) => {
          if (a.id.includes("country")) {
            return a.id;
          } else {
            return false;
          }
        });
        if (placeObj) {
          return `${placeName}, ${placeObj.text}, ${countryObj.text}`;
        } else {
          return `${placeName}, ${countryObj.text}`;
        }
      })
      .then((locationName: string) => {
        setLocation(locationName);
      });
  };

  const fetchCurrentWeatherData = async (searchTerm: string) => {
    // fetch current weather data
    fetch(`${WEATHER_API_BASE_URL}${searchTerm}${WEATHER_API_KEY}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Location not found");
        }
      })
      .then((jsonBody: IWeather) => setWeather({ ...jsonBody }));
  };

  return (
    <div
      className="App"
      // style={{
      //   backgroundImage: `url(${backgroundImages})`,
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <div className="App-WeatherContainer">
        <SearchBox handleSearchSubmit={handleSearchSubmit} />
        <Weather
          location={location}
          weather={weather}
          setLocation={setLocation}
          handleCurrentLocationClick={handleCurrentLocationClick}
        />
      </div>
    </div>
  );
}
