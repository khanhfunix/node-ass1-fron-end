import { useState, useEffect } from "react";
import NavHomePage from "./NavHomePage";
import SearchComponent from "./SearchComponent";
import classes from "./NavBar.module.css";

const NavBar = (props) => {
  const [backgroundNav, setBackgroundNav] = useState(false);
  useEffect(() => {
    //  logic scroll chuot thi doi mau` background nav
    const scrollHandler = () => {
      setBackgroundNav(window.scrollY >= 200);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      // cleanup function
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);


  return (
    <div
      className={classes.NavBar}
      style={backgroundNav ? {} : { background: "transparent" }}
    >
      <NavHomePage />
      <SearchComponent />
    </div>
  );
};

export default NavBar;
