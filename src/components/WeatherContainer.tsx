import { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";
import { Container, Text } from "@chakra-ui/react";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

export default function WeatherContainer(): JSX.Element {
  const { location } = useContext(LocationContext);
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
