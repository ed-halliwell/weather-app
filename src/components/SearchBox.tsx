import React, { useState } from "react";
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { GEO_API_BASE_URL, GEO_API_KEY } from "../utils/APIFragments";
import { PlaceNameContext } from "../utils/interfaces";

interface SearchBoxProps {
  handleSetLocation: (locationName: string) => void;
}

export default function SearchBox({
  handleSetLocation,
}: SearchBoxProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchSubmit = async (searchTerm: string) => {
    // fetch full placename
    fetch(`${GEO_API_BASE_URL}${searchTerm}${GEO_API_KEY}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Location not found");
        }
      })
      .then((res) => {
        const placeName = res.features[0].text;
        const contextArray = res.features[0].context;
        const placeObj = contextArray.find((a: PlaceNameContext) => {
          return a.id.includes("place") ? a.id : false;
        });
        const countryObj = contextArray.find((a: PlaceNameContext) => {
          return a.id.includes("country") ? a.id : false;
        });
        if (placeObj) {
          return `${placeName}, ${placeObj.text}, ${countryObj.text}`;
        } else {
          return `${placeName}, ${countryObj.text}`;
        }
      })
      .then((locationName: string) => {
        handleSetLocation(locationName);
      });
  };

  //   'Get my current location' coordinates from browser
  const handleMyLocationClick = async () => {
    const pos: GeolocationPosition = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    // Get Location Name from Coordinates

    await fetch(
      `${GEO_API_BASE_URL}${pos.coords.longitude},${pos.coords.latitude}${GEO_API_KEY}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Location not found");
        }
      })
      .then((res) => {
        const contextArray: PlaceNameContext[] = res.features[0].context;
        const neighborhood = contextArray.find((a: PlaceNameContext) =>
          a.id.includes("neighborhood")
        );
        const placeObj = contextArray.find((a: PlaceNameContext) =>
          a.id.includes("place")
        );
        const countryObj = contextArray.find((a: PlaceNameContext) =>
          a.id.includes("country")
        );
        if (placeObj) {
          return `${neighborhood?.text}, ${placeObj.text}, ${countryObj?.text}`;
        } else {
          return `${neighborhood?.text}, ${countryObj?.text}`;
        }
      })
      .then((locationName: string) => {
        handleSetLocation(locationName);
      });
  };

  return (
    <Container py="1rem" borderBottom="1px solid lightgrey">
      <form
        autoComplete="off"
        onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSearchSubmit(searchQuery);
          setSearchQuery("");
        }}
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" mt="2" />
          </InputLeftElement>
          <Input
            className="SearchBox-input"
            type="text"
            name="searchBox"
            size="lg"
            variant="outline"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a town or city"
          />
          <InputRightElement>
            <Button
              mt="2"
              mr="2"
              borderRadius="100%"
              onClick={() => handleMyLocationClick()}
            >
              <PlusSquareIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </Container>
  );
}
