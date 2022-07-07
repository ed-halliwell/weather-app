import SearchBox from "./components/SearchBox";
import { Box, Center, VStack } from "@chakra-ui/react";
import WeatherContainer from "./components/WeatherContainer";
import LocationContextWrapper from "./components/LocationContextWrapper";

export default function App(): JSX.Element {
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
      <LocationContextWrapper>
        <Box
          boxShadow="0 8px 6px -6px black"
          bg={["white"]}
          borderRadius="5px"
          m="0"
          w="100%"
          maxW={["40em"]}
        >
          <VStack>
            <SearchBox />
            <WeatherContainer />
          </VStack>
        </Box>
      </LocationContextWrapper>
    </Center>
  );
}
