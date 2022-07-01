import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Heading } from "@chakra-ui/react";
import {
  WEATHER_API_KEY,
  WEATHER_FORECAST_API_BASE_URL,
} from "../utils/APIFragments";

interface ForecastProps {
  location: string;
}

export default function Forecast({ location }: ForecastProps): JSX.Element {
  const [forecast, setForecast] = useState<unknown | undefined>();

  useEffect(() => {
    const fetchForecastData = async (searchTerm: string) => {
      console.log("making fetchForecastData call");
      const forecastRes = await axios.get(
        // `${WEATHER_FORECAST_API_BASE_URL}lat=${newCoordinates[0]}&lon=${newCoordinates[1]}&exclude=minutely,hourly${WEATHER_API_KEY}`
        `${WEATHER_FORECAST_API_BASE_URL}lat=0&lon=0&exclude=current,minutely,hourly${WEATHER_API_KEY}`
      );
      console.log(forecastRes.data);
      setForecast(forecastRes.data);
      console.log(forecast);
    };

    if (location && !forecast) fetchForecastData(location);
  }, [forecast, location]);

  return (
    <Container maxW="100%" py="1rem">
      <Heading fontSize="md">Weather Forecast</Heading>
      {/* {forecast && (
        <>
          <HStack spacing="8">
            <Text as="span" fontSize="5xl">
              {currentWeather && Math.round(currentWeather.main.temp - 273.15)}{" "}
              °C
            </Text>
            <WindIcon
              windSpeed={currentWeather.wind.speed}
              windDirection={currentWeather.wind.deg}
            />
          </HStack>
          <Text fontSize="sm">
            Feels like: {Math.round(currentWeather.main.feels_like - 273.15)} °C
          </Text>
          <Text fontSize="sm" sx={{ textTransform: "capitalize" }}>
            {currentWeather.weather[0].description}
          </Text>
          <Text fontSize="sm">
            {getWindDescription(
              currentWeather.wind.speed,
              currentWeather.wind.deg
            )}
          </Text>
        </>
      )} */}
    </Container>
  );
}
