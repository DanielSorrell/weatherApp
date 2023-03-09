import React from "react";
import { Link } from "react-router-dom";

const Footer = ({orientation}) => {
  return (
    <div id={orientation}>
      <div className="partialTabContainer">
        <a id="githubLink" className="link" href="https://github.com/DanielSorrell" target="_blank" rel="noopener noreferrer">View source code</a>
        <Link to="/about" className="link" style={{ textDecoration: "none" }}><h3>About</h3></Link>
      </div>
    </div>
  );
}

export default Footer;
