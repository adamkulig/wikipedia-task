import React, { useState } from "react";
import { Typography } from "antd";
import { get, isNil } from "lodash";
import axios from "axios";
import "./App.css";

import { SearchEngine, ReplaceEngine, ResultList } from "./components";
const { Title } = Typography;

function App() {
  const [replacedPhrase, setReplacedPhrase] = useState("");
  const [results, setResults] = useState(null);
  const [isError, setIsError] = useState(false);

  const onSearch = async (value) => {
    setIsError(false);
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=10&origin=*&srsearch=${value}`;
    try {
      const res = await axios.get(url);
      const data = get(res, "data.query.search");
      const desiredResults = data.map((result) => ({
        id: result.pageid,
        title: result.title,
        snippet: result.snippet,
      }));
      console.log(desiredResults);
      setResults(desiredResults);
    } catch {
      setResults([]);
      setIsError(true);
    }
  };

  const onReplace = (value) => {
    replacedPhrase !== value && setReplacedPhrase(value);
    const regex = /<span\sclass="searchmatch">(.*?)<\/span>/;
    const firstMatch = results.find((item) => item.snippet.match(regex));
    const modifiedResult = {
      ...firstMatch,
      snippet: firstMatch.snippet.replace(
        regex,
        `<span class="searchmatch">${value}</span>`
      ),
    };
    const modifiedResults = results.map((item) =>
      item.id === firstMatch.id ? modifiedResult : item
    );
    setResults(modifiedResults);
  };

  const onReplaceAll = (value) => {
    replacedPhrase !== value && setReplacedPhrase(value);
    const regex = /<span\sclass="searchmatch">(.*?)<\/span>/g;
    const modifiedResults = results.map((item) => ({
      ...item,
      snippet: item.snippet.replace(
        regex,
        `<span class="searchmatch">${value}</span>`
      ),
    }));
    setResults(modifiedResults);
  };

  console.log(results);
  return (
    <div className="App">
      <Title level={3}>Wikipedia Searcher</Title>
      <SearchEngine onSearch={onSearch} />
      <ReplaceEngine onReplace={onReplace} onReplaceAll={onReplaceAll} />
      {!isNil(results) && <ResultList results={results} />}
      {isError && (
        <Title className="error" level={5}>
          Wystąpił błąd
        </Title>
      )}
    </div>
  );
}

export default App;
