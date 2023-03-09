import { React } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./partials/Header.js";
import Footer from "./partials/Footer.js";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="fillPage">

      <Header />

      <div className="centerElementsContainer">

        <div id="aboutInfo">
          <p>Weather now is an international city based weather data application.</p>
          <p>5 cities maximum are allowed per guest/user account.</p>
          <p>Weather Now is powered by:</p>
          <ul>
            <li className="link aboutLink"><a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">OpenWeatherMap <b>API</b> weather data</a></li>
            <li className="link aboutLink"><a href="https://www.mongodb.com/home" target="_blank" rel="noopener noreferrer">MongoDB non-relational <b>database</b></a></li>
            <li className="link aboutLink"><a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">Express Node.JS <b>web application framework</b></a></li>
            <li className="link aboutLink"><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React <b>front-end</b> JavaScript library</a></li>
            <li className="link aboutLink"><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">Node.js JavaScript <b>runtime environment</b></a></li>
            <li className="link aboutLink"><a href="https://cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud <b>web hosting</b></a></li>  
          </ul>
        </div>
      </div>
      <Footer orientation={"footerContainerAbs"} />

    </div>
  );
}

export default About;
