import WindIcon from "./WindIcon";
import { ICurrentWeather } from "../utils/interfaces";
import getWindDescription from "../utils/getWindDescription";
import { Container, Heading, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from "../utils/APIFragments";
import getTempInC from "../utils/getTempInC";

interface CurrentWeatherProps {
  location: string;
}

export default function CurrentWeather({
  location,
}: CurrentWeatherProps): JSX.Element {
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>();

  useEffect(() => {
    if (location && !currentWeather) fetchCurrentWeatherData(location);
  }, [currentWeather, location]);

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
  return (
    <Container maxW="100%" py="1rem">
      <Heading fontSize="md">Current Weather</Heading>
      {currentWeather && (
        <>
          <HStack spacing="8">
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
