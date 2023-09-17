import React, { useState, useEffect } from "react";
import NavBar from "../UI/NavBar/NavBar";
import Banner from "./Banner";

import MovieList from "./MovieList/MovieList";

function Browse() {
  return (
    <div className="app">
      <NavBar />
      <Banner />
      <MovieList />
    </div>
  );
}

export default Browse;
