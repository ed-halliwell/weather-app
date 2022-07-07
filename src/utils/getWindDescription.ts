export default function getWindDescription(
  speed: number,
  degrees: number
): string {
  let strength = "";
  if (speed <= 0) {
    strength = `No`;
  } else if (speed > 0 && speed <= 5) {
    strength = "Light";
  } else if (speed > 5 && speed <= 15) {
    strength = "Moderate";
  } else if (speed > 15 && speed <= 25) {
    strength = "Strong";
  } else {
    strength = "Very strong";
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
  } else if (
    (337.5 <= degrees && degrees < 360) ||
    (degrees >= 0 && degrees < 22.5)
  ) {
    direction = "north";
  } else {
    direction = "sky";
  }
  return `${strength} winds from the ${direction}`;
}
