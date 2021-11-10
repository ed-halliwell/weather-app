import React, { useState } from "react";
import "../styles/SearchBox.css";

interface SearchBoxProps {
  handleSearchSubmit: (searchQuery: string) => void;
}

export default function SearchBox(props: SearchBoxProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <form
      className="SearchBox"
      autoComplete="off"
      onSubmit={(e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          children: { searchBox: { value: string } };
        };
        setSearchQuery("");
        const searchTerm = target.children.searchBox.value;
        props.handleSearchSubmit(searchTerm);
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
