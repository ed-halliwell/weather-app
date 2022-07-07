import { Grid, GridItem, Text } from "@chakra-ui/react";
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
    <Grid
      display="flex"
      alignItems="center"
      templateColumns="repeat(4, 1fr)"
      bg="#f7f6f679"
      mb="0.5rem"
      h="3.5rem"
      border="1px"
      minW="5rem"
      borderRadius="5px"
    >
      <GridItem bg="orange" colSpan={1} minW="5rem">
        <Text fontSize="sm">{moment(date).format("dddd")}</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Text fontSize="sm">
          {getTempInC(temp.max) + " / " + getTempInC(temp.min)} °C
        </Text>
        <WindIcon windSpeed={wind.wind_speed} windDirection={wind.wind_deg} />
      </GridItem>

      <GridItem colSpan={1}>
        <Text fontSize="xs" sx={{ textTransform: "capitalize" }}>
          {weather.description}
        </Text>
      </GridItem>
    </Grid>
  );
}
