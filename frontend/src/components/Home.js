import { React } from "react";
import { Link } from "react-router-dom";
import Footer from "./partials/Footer.js";
import Header from "./partials/Header.js";

function App() {

  return (
    <div id="homeContainer">

      <div id="homeNavigationContainer" className="centerElementsContainer">
        <h2>Weather Now: free weather app</h2>
        <Link to="/weather" className="link homeNavigation" style={{ textDecoration: "none" }}><b>Continue as guest</b></Link>
        <Link to="/register" className="link homeNavigation" style={{ textDecoration: "none" }}><b>Create account</b></Link>
        <Link to="/login" className="link homeNavigation" style={{ textDecoration: "none" }}><b>Login</b></Link>
      </div>

      <Footer orientation={"footerContainerAbs"}/>

    </div>
  );
}

export default App;
