import { Center, Box } from "@chakra-ui/react";

interface Props {
  windDirection: number;
  windSpeed: number;
}

export default function WindIcon({
  windDirection,
  windSpeed,
}: Props): JSX.Element {
  const adjDirection = windDirection - 180;
  return (
    <Center>
      <Center
        sx={{
          borderRadius: "50%",
          border: "1px",
          backgroundColor: "white",
          width: "1.5rem",
          height: "1.5rem",
          zIndex: "3",
          fontWeight: "bold",
        }}
      >
        {Math.round(windSpeed)}
      </Center>
      <Box
        style={{
          transform: `rotate(${adjDirection}deg)`,
          position: "absolute",
          height: "2.8rem",
          fontSize: "0.8rem",
        }}
      >
        &#8593;
      </Box>
    </Center>
  );
}
