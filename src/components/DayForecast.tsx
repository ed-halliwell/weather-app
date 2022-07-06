import { Box, HStack, Text } from "@chakra-ui/react";
import moment from "moment";
import getTempInC from "../utils/getTempInC";
import getWindDescription from "../utils/getWindDescription";
import { DailyForecast } from "../utils/interfaces";
import WindIcon from "./WindIcon";

interface DayForecastProps {
  forecast: DailyForecast;
}

export default function DayForecast(props: DayForecastProps): JSX.Element {
  const { date, temp, feels_like, weather, wind } = props.forecast;
  console.log(props.forecast);
  return (
    <Box border="1px" width="4rem">
      <Text fontSize="sm">{moment(date).format("dddd")}</Text>
      <Text sx={{ textTransform: "capitalize" }}>{weather.description}</Text>
      <Text fontSize="sm">
        {getTempInC(temp.max) + " / " + getTempInC(temp.min)} °C
      </Text>
      <WindIcon windSpeed={wind.wind_speed} windDirection={wind.wind_deg} />
    </Box>
  );
}
