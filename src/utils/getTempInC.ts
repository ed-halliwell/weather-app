export default function getTempInC(tempInK: number): number {
  return Math.round(tempInK - 273.15);
}
