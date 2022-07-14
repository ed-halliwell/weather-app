export default function dayOrNight(unixTimestamp: number): string {
  const date = new Date(Number(unixTimestamp));
  const hour = date.getHours();
  if (hour < 7 || hour > 19) return "night";
  else return "day";
}
