import React, { useState } from "react";
import "../styles/SearchBox.css";

interface SearchBoxProps {
  handleSearchSubmit: (searchQuery: React.FormEvent) => void;
}

export default function SearchBox(props: SearchBoxProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <form
      className="SearchBox"
      autoComplete="off"
      onSubmit={(e: React.FormEvent) => {
        setSearchQuery("");
        props.handleSearchSubmit(e);
      }}
    >
      <input
        className="SearchBox-input"
        type="text"
        name="searchBox"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter a town or city"
      />
    </form>
  );
}
