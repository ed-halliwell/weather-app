import { Box, Text } from "@chakra-ui/react";
import moment from "moment";
import getTempInC from "../utils/getTempInC";
import { DailyForecast } from "../utils/interfaces";
import WindIcon from "./WindIcon";

interface DayForecastProps {
  forecast: DailyForecast;
}

export default function DayForecast(props: DayForecastProps): JSX.Element {
  const { date, temp, feels_like, weather, wind } = props.forecast;
  console.log(feels_like);
  return (
    <Box
      bg="#f1f0f0"
      mr="0.5rem"
      h="100%"
      border="1px"
      minW="5rem"
      borderRadius="5px"
    >
      <Text fontSize="sm">{moment(date).format("dddd")}</Text>
      <Text sx={{ textTransform: "capitalize" }}>{weather.description}</Text>
      <Text fontSize="sm">
        {getTempInC(temp.max) + " / " + getTempInC(temp.min)} °C
      </Text>
      <WindIcon windSpeed={wind.wind_speed} windDirection={wind.wind_deg} />
    </Box>
  );
}
