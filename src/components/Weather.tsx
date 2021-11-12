import "../styles/Weather.css";
import CurrentWeather from "./CurrentWeather";
import { IWeather, PlaceNameContext } from "../utils/interfaces";
import { GEO_API_BASE_URL, GEO_API_KEY } from "../utils/APIFragments";

interface WeatherProps {
  weather: IWeather | undefined;
  location: string;
  setLocation: (locationName: string) => void;
  handleCurrentLocationClick: (searchQuery: string) => void;
}

export default function Weather(props: WeatherProps): JSX.Element {
  //   const [forecast, setForecast] = useState<IForecast>();

  //   'Get my current location' coordinates from browser
  const handleMyLocationClick = async () => {
    const pos: GeolocationPosition = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    console.log(pos);
    await fetchFullPlaceNameFromCoordinates(
      pos.coords.latitude,
      pos.coords.longitude
    );
  };

  const fetchFullPlaceNameFromCoordinates = async (
    lat: number,
    long: number
  ) => {
    // Get Location Name from Coordinates
    fetch(`${GEO_API_BASE_URL}${long},${lat}${GEO_API_KEY}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Location not found");
        }
      })
      .then((res) => {
        const contextArray: PlaceNameContext[] = res.features[0].context;
        const neighborhood = contextArray.find((a: PlaceNameContext) =>
          a.id.includes("neighborhood")
        );
        const placeObj = contextArray.find((a: PlaceNameContext) =>
          a.id.includes("place")
        );
        const countryObj = contextArray.find((a: PlaceNameContext) =>
          a.id.includes("country")
        );
        if (placeObj) {
          return `${neighborhood?.text}, ${placeObj.text}, ${countryObj?.text}`;
        } else {
          return `${neighborhood?.text}, ${countryObj?.text}`;
        }
      })
      .then((locationName: string) => {
        props.setLocation(locationName);
        props.handleCurrentLocationClick(locationName);
      });
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
          onClick={() => handleMyLocationClick()}
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
