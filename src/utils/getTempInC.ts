export default function getTempInC(tempInK: number): number {
  if (tempInK < 0) return 0;
  return Math.round(tempInK - 273.15);
}
