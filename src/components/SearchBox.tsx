import React, { useState } from "react";

interface Props {
  handleSearchSubmit: (searchQuery: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchBox(props: Props) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <form className="SearchBox" onSubmit={(e) => props.handleSearchSubmit(e)}>
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
