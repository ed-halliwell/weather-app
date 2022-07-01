import CurrentWeather from "./CurrentWeather";
import { Container, Text } from "@chakra-ui/react";
import Forecast from "./Forecast";

interface WeatherContainerProps {
  location: string;
}

export default function WeatherContainer({
  location,
}: WeatherContainerProps): JSX.Element {
  return (
    <Container py="0" maxW="100%">
      <Text fontSize="xl" m="1rem">
        {location ? location : "Is it raining there?"}
      </Text>
      {location && (
        <>
          <CurrentWeather location={location} />
          <Forecast location={location} />
        </>
      )}
    </Container>
  );
}
