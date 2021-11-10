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

  const handleSearchSubmit = async (e: any) => {
    e.preventDefault();
    const searchTerm = e.target.children.searchBox.value;

    // fetch full placename
    fetch(`${GEO_API_BASE_URL}${searchTerm}${GEO_API_KEY}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((res) => {
        const placeName = res.features[0].text;
        const contextArray = res.features[0].context;
        const placeObj = contextArray.filter((a: PlaceNameContext) => {
          if (a.id.includes("place")) {
            return a.id;
          } else {
            return false;
          }
        });
        const countryObj = contextArray.filter((a: PlaceNameContext) => {
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

    // fetch current weather data
    fetch(`${WEATHER_API_BASE_URL}${searchTerm}${WEATHER_API_KEY}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((jsonBody: any) => setWeather({ ...jsonBody }));
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
        />
      </div>
    </div>
  );
}
