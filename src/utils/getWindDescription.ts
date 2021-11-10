export default function getWindDescription(
  speed: number,
  degrees: number
): string {
  let strength = "";
  if (speed < 5) {
    strength = "Light";
  } else if (speed > 15) {
    strength = "Strong";
  } else if (speed > 25) {
    strength = "Very strong";
  } else {
    strength = "Moderate";
  }

  let direction = "";
  if (22.5 <= degrees && degrees < 67.6) {
    direction = "north east";
  } else if (67.6 <= degrees && degrees < 112.5) {
    direction = "east";
  } else if (112.5 <= degrees && degrees < 157.5) {
    direction = "south east";
  } else if (157.5 <= degrees && degrees < 202.5) {
    direction = "south";
  } else if (202.5 <= degrees && degrees < 247.5) {
    direction = "south west";
  } else if (247.5 <= degrees && degrees < 292.5) {
    direction = "west";
  } else if (292.5 <= degrees && degrees < 337.5) {
    direction = "north west";
  } else {
    direction = "north";
  }
  return `${strength} winds from the ${direction}`;
}
