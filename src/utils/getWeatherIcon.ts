export default function getWeatherIcon(
  dayOrNight: string,
  description: string
): string {
  if (dayOrNight === "day" && description === "clear sky") return "☀️";
  if (dayOrNight === "night" && description === "clear sky") return "🌙";
  if (description === "few clouds") return "🌤";
  if (description === "scattered clouds") return "⛅️";
  if (description === "broken clouds") return "☁️";
  if (description === "shower rain") return "🌧";
  if (description === "rain") return "🌦";
  if (description === "thunderstorm") return "⛈";
  if (description === "snow") return "🌨";
  if (description === "mist") return "🌫";
  else return "☀️";
}
