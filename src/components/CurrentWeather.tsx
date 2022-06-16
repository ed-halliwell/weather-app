import WindIcon from "./WindIcon";
import { ICurrentWeather } from "../utils/interfaces";
import getWindDescription from "../utils/getWindDescription";
import { Container, Heading, HStack, Text } from "@chakra-ui/react";

interface Props {
  weatherData: ICurrentWeather;
}

export default function CurrentWeather({ weatherData }: Props): JSX.Element {
  return (
    <Container maxW="100%" py="1rem">
      <Heading fontSize="md">Current Weather</Heading>
      {weatherData && (
        <HStack spacing="8">
          <Text as="span" fontSize="5xl">
            {weatherData && Math.round(weatherData.main.temp - 273.15)} °C
          </Text>
          <WindIcon
            windSpeed={weatherData.wind.speed}
            windDirection={weatherData.wind.deg}
          />
        </HStack>
      )}
      {weatherData && (
        <>
          <Text fontSize="sm">
            Feels like: {Math.round(weatherData.main.feels_like - 273.15)} °C
          </Text>
          <Text fontSize="sm">
            {getWindDescription(weatherData.wind.speed, weatherData.wind.deg)}
          </Text>
          <Text fontSize="sm" sx={{ textTransform: "capitalize" }}>
            {weatherData.weather[0].description}
          </Text>
        </>
      )}
    </Container>
  );
}
