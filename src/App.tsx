import { useState } from "react";
import SearchBox from "./components/SearchBox";
import Weather from "./components/Weather";

export default function App(): JSX.Element {
  const [location, setLocation] = useState<string>("");

  const handleSearchSubmit = (e: any): void => {
    e.preventDefault();
    const searchTerm = e.target.children.searchBox.value;
    setLocation(searchTerm);
  };

  return (
    <div
      className="App"
      // style={{
      //   backgroundImage: `url(${backgroundImages})`,
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <div className="App-WeatherContainer">
        <SearchBox handleSearchSubmit={handleSearchSubmit} />
        <Weather location={location} setLocation={setLocation} />
      </div>
    </div>
  );
}
