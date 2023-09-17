import React, { useEffect, useState } from "react";
import NavBar from "../UI/NavBar/NavBar";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";

const Search = () => {
  const [searchInput, setSearchInput] = useState(""); //state de update input nguoi dung tim kiem
  const [clickSubmit, setClickSubmit] = useState(false); //state de hien thi ra search result khi nguoi dung submitfrom
  const [searchResult, setSearchResult] = useState(""); //lay result de fetch

  // Ham update input State
  const searchChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };
// Ham submit
  const submitHandler = (event) => {
    event.preventDefault();
    setSearchResult(searchInput);
    setClickSubmit(true);
  };
// Ham reset input
  const resetHandler = () => {
    setClickSubmit(false);
    setSearchInput("");
  };

  return (
    <div className="app">
      <NavBar />
      <SearchForm
        onChange={searchChangeHandler}
        onSubmit={submitHandler}
        onReset={resetHandler}
        value={searchInput}
      />
      {clickSubmit && <SearchResult searchResult={searchResult} />}
    </div>
  );
};

export default Search;
