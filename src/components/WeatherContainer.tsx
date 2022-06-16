import CurrentWeather from "./CurrentWeather";
import { Container, Text } from "@chakra-ui/react";

interface WeatherContainerProps {
  location: string;
}

export default function WeatherContainer({
  location,
}: WeatherContainerProps): JSX.Element {
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
      {location && <CurrentWeather location={location} />}
      {/* <Forecast forecast={{ ...forecast }} />  */}
    </Container>
  );
}
