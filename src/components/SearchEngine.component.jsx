import React, { useState } from "react";
import { Input, Button } from "antd";

const SearchEngine = ({ onSearch }) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const onChange = (e) => setSearchPhrase(e.target.value);
  const onSearchClick = () => searchPhrase !== "" && onSearch(searchPhrase);
  return (
    <div>
      <Input
        className="input"
        placeholder="search phrase"
        type="text"
        onChange={onChange}
        value={searchPhrase}
      />
      <Button type="primary" className="button" onClick={onSearchClick}>
        Search
      </Button>
    </div>
  );
};

export default SearchEngine;
