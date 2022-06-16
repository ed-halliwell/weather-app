import { useEffect, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import { ICurrentWeather } from "../utils/interfaces";
import { Container, Text } from "@chakra-ui/react";
import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "../utils/APIFragments";

interface WeatherContainerProps {
  location: string;
}

export default function WeatherContainer({
  location,
}: WeatherContainerProps): JSX.Element {
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>();

  useEffect(() => {
    if (location) fetchCurrentWeatherData(location);
  }, [location]);

  const fetchCurrentWeatherData = async (searchTerm: string) => {
    fetch(`${WEATHER_API_BASE_URL}${searchTerm}${WEATHER_API_KEY}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Location not found");
        }
      })
      .then((res: ICurrentWeather) => setCurrentWeather({ ...res }));
  };

  //   const [forecast, setForecast] = useState<IForecast>();

  //       let forecastRes = await axios.get(
  //         `${WEATHER_FORECAST_API_BASE_URL}lat=${newCoordinates[0]}&lon=${newCoordinates[1]}&exclude=minutely,hourly${WEATHER_API_KEY}`
  //       );
  //       let newForecast = forecastRes.data.daily;
  //       // console.log(newForecast);

  return (
    <Container py="0" maxW="100%">
      <Text fontSize="xl" m="1rem">
        {location ? location : "Is it raining there?"}
      </Text>
      {currentWeather && <CurrentWeather weatherData={currentWeather} />}
      {/* <Forecast forecast={{ ...forecast }} />  */}
    </Container>
  );
}
