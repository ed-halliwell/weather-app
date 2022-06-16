import { useState } from "react";
import SearchBox from "./components/SearchBox";
import { Box, Center, VStack } from "@chakra-ui/react";
import WeatherContainer from "./components/WeatherContainer";

export default function App(): JSX.Element {
  const [location, setLocation] = useState<string>("");

  return (
    <Center
      bg="linear-gradient(
      0deg,
      rgba(92, 126, 213, 1) 27%,
      rgba(149, 227, 242, 1) 100%
    )"
      h="100vh"
      color="rgb(35, 48, 82)"
    >
      <Box
        boxShadow="0 8px 6px -6px black"
        bg="white"
        borderRadius="5px"
        m="0"
        minW={{ base: "85%", md: "600px" }}
      >
        <VStack>
          <SearchBox handleSetLocation={setLocation} />
          <WeatherContainer location={location} />
        </VStack>
      </Box>
    </Center>
  );
}
