import WindIcon from "./WindIcon";
import { ICurrentWeather } from "../utils/interfaces";
import getWindDescription from "../utils/getWindDescription";
import { Container, Heading, HStack, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "../utils/APIFragments";
import getTempInC from "../utils/getTempInC";
import getWeatherIcon from "../utils/getWeatherIcon";
import dayOrNight from "../utils/dayOrNight";
import { LocationContext } from "../contexts/LocationContext";

export default function CurrentWeather(): JSX.Element {
  const { location } = useContext(LocationContext);
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
      .then((res: ICurrentWeather) => {
        setCurrentWeather({ ...res });
      });
  };
  return (
    <Container maxW="100%" py="1rem">
      <Heading fontSize="md">Current Weather</Heading>
      {currentWeather && (
        <>
          <HStack spacing="6">
            <Text as="span" fontSize="6xl">
              {getWeatherIcon(
                dayOrNight(Number(currentWeather.dt) * 1000),
                currentWeather.weather[0].description
              )}
            </Text>
            <Text as="span" fontSize="5xl">
              {currentWeather && getTempInC(currentWeather.main.temp)} °C
            </Text>
            <WindIcon
              windSpeed={currentWeather.wind.speed}
              windDirection={currentWeather.wind.deg}
            />
          </HStack>
          <Text fontSize="sm">
            Feels like: {getTempInC(currentWeather.main.feels_like)} °C
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
      )}
    </Container>
  );
}
