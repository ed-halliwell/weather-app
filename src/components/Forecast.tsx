import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Heading, HStack } from "@chakra-ui/react";
import {
  GET_COORDS_FROM_LOCATION,
  WEATHER_API_KEY,
  WEATHER_FORECAST_API_BASE_URL,
} from "../utils/APIFragments";
import { DailyForecast } from "../utils/interfaces";
import DayForecast from "./DayForecast";

interface ForecastProps {
  location: string;
}

export default function Forecast({ location }: ForecastProps): JSX.Element {
  const [dailyForecast, setDailyForecast] = useState<
    DailyForecast[] | undefined
  >();

  useEffect(() => {
    if (location && !dailyForecast) fetchForecastData(location);
  }, [dailyForecast, location]);

  const fetchForecastData = async (searchTerm: string) => {
    const getCoordinates = await axios.get(
      `${GET_COORDS_FROM_LOCATION}${searchTerm}&limit=1${WEATHER_API_KEY}`
    );
    const lat = getCoordinates.data[0].lat;
    const lon = getCoordinates.data[0].lon;

    const forecastRes = await axios.get(
      `${WEATHER_FORECAST_API_BASE_URL}lat=${lat}&lon=${lon}&exclude=current,minutely,hourly${WEATHER_API_KEY}`
    );

    const dailyForecastRaw = forecastRes.data.daily;
    console.log(dailyForecastRaw);

    const formattedForecast = dailyForecastRaw.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (dayForecast: any): DailyForecast => ({
        date: new Date(dayForecast.dt * 1000).toDateString(),
        temp: {
          ...dayForecast.temp,
        },
        feels_like: {
          ...dayForecast.feels_like,
        },
        weather: {
          description: dayForecast.weather[0].description,
          main: dayForecast.weather[0].main,
        },
        wind: {
          wind_speed: dayForecast.wind_speed,
          wind_deg: dayForecast.wind_deg,
          wind_gust: dayForecast.wind_gust,
        },
      })
    );
    console.log(formattedForecast);
    setDailyForecast(formattedForecast);
  };

  return (
    <Container maxW="100%" py="1rem">
      <Heading fontSize="md">Weather Forecast</Heading>
      <Box border="1px" maxW="80%">
        <HStack overflowX="scroll" spacing={2}>
          {dailyForecast &&
            dailyForecast.map((day, i) => {
              return <DayForecast key={i + 1} forecast={day} />;
            })}
        </HStack>
      </Box>
    </Container>
  );
}
