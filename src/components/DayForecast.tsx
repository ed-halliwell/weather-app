import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import dayOrNight from "../utils/dayOrNight";
import getTempInC from "../utils/getTempInC";
import getWeatherIcon from "../utils/getWeatherIcon";
import { DailyForecast } from "../utils/interfaces";
import WindIcon from "./WindIcon";

interface DayForecastProps {
  forecast: DailyForecast;
}

export default function DayForecast(props: DayForecastProps): JSX.Element {
  const { date, temp, weather, wind } = props.forecast;
  return (
    <SimpleGrid
      display="flex"
      alignItems="center"
      justifyContent="center"
      spacing={3}
      templateColumns="repeat(4, 1fr)"
      bg="#f7f6f679"
      mb="0.5rem"
      h="3.5rem"
      border="1px"
      minW="5rem"
      borderRadius="5px"
    >
      <Text fontWeight="bold" fontSize="sm" w={8}>
        {date.toString().split(" ")[0]}
      </Text>
      <Text fontSize="sm" w={20}>
        {getTempInC(temp.max) + " / " + getTempInC(temp.min)} °C
      </Text>
      <Text fontSize="3xl" w={8}>
        {getWeatherIcon(dayOrNight(Number(date) * 1000), weather.description)}
      </Text>
      <Box w={8}>
        <WindIcon windSpeed={wind.wind_speed} windDirection={wind.wind_deg} />
      </Box>
    </SimpleGrid>
  );
}
