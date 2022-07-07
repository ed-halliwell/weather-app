import { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";
import { Container, SimpleGrid, Text } from "@chakra-ui/react";
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
          <SimpleGrid columns={2} spacing={5}>
            <CurrentWeather location={location} />
            <Forecast location={location} />
          </SimpleGrid>
        </>
      )}
    </Container>
  );
}
