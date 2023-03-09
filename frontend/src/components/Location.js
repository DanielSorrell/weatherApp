import { React, useState, useEffect } from "react";
import { useLocationsContext } from "../hooks/useLocationsContext";
import ReactLoading from "react-loading";

import DayDisplayUnit from "./DayDisplayUnit";
import HourDisplayUnit from "./HourDislayUnit";

const Location = ({ details, getVideoBackground, isLoading, setIsLoading }) => {
  const [weatherData, setWeatherData] = useState();
  const [errors, setErrors] = useState([]);
  const { locations, dispatch } = useLocationsContext();
  const [toggleAlert, setToggleAlert] = useState(false);

  /**
   * Takes a angle in degrees of the wind direction and converts to cardinal direction.
   * @param {int} degree - degree of wind direction  
   * @returns {string} String of wind direction in cardinal direction.
   */
  const getWindDirection = (degree) => {
    let direction;

    if(degree > 15 && degree <= 75){
      direction = "Northeast wind";
    } else if(degree > 75 && degree <= 105){
      direction = "East wind";
    } else if(degree > 105 && degree <= 165){
      direction = "Southeast wind";
    } else if(degree > 165 && degree <= 195){
      direction = "South wind";
    } else if(degree > 195 && degree <= 255){
      direction = "Southwest wind";
    } else if(degree > 255 && degree <= 345){
      direction = "Northwest wind";
    } else if((degree > 345 && degree <= 360) || (degree >= 0 && degree <= 15)){
      direction = "North wind";
    } else {
      direction = "Error finding wind direction";
    }
    return direction;
  }
  
  /**
   * Takes an icon id and returns the URL to display the weather icon associated with the icon id.
   * @param {string} iconId - 3 digit icon id that corresponds with a weather icon
   * @returns {string} String of URL to display icon
   */
  const getImageSrc = (iconId) => {
    return "https://openweathermap.org/img/wn/" + iconId + "@2x.png";
  }

  /**
   * Takes a Unix UTC timestamp and converts to meridiem time.
   * @param {int} timeStamp - int of Unix UTC timestamp 
   * @returns {string} String of meridiem time
   */
  const getTimeConversion = (timeStamp) => {
    let conversion = new Date(timeStamp * 1000);
    conversion = conversion.toLocaleTimeString("default");
    return conversion.substring(0, conversion.length - 6) + " " + conversion.substring(conversion.length - 2, conversion.length);
  }

  /**
   * Takes latitude and longitude coordinates of a location to retrieve its weather data
   * and set the background of the weather page..
   * @param {string} latCoords - latitude coordinate of location
   * @param {string} longCoords - longitude coordinate of location
   */
  const getWeatherData = async (latCoords, longCoords) => {
    console.log("Weather data retrieval temporary blocked from api");
    
    setIsLoading(true);
    const response = await fetch("http://localhost:5000/search/getWeather/" + latCoords + "/" + longCoords,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
    );
    const json = await response.json();
    if(response.ok){
      console.log(json);
      setIsLoading(false);
      setWeatherData(json);
      getVideoBackground(json.current.weather[0].id);
    }
    if(!response.ok){
      setIsLoading(false);
      console.log("Error retrieving weather data for " + details.city);
      console.log(json.error);
    }
    
  }

  //get and display new weather information of queried city
  useEffect(() => {
    getWeatherData(details.latCoords, details.longCoords);
  }, [details]);

  //expand drop down menu of more information for the weather alert
  useEffect(() => {
    if(toggleAlert){
      setToggleAlert("expandedParent");
    } else {
      setToggleAlert("");
    }
  }, [toggleAlert]);

  return (
    <div>
      {isLoading ? 
        <div className="loading">
          <div>Loading location...</div>
            <div>
              <ReactLoading type={"spin"} color={"#0468F9"} />
            </div>
          </div>
      :
      <div>
      {weatherData && 
          <div id="currentWeather">

            <div id="currentCityHeader" className="flexRowContainer">
              <div className="spaceElementsLarge centerElementsContainer">
                <h2>{details.city}, {details.state} {details.country}</h2>
              </div>

              {weatherData.alerts && 
                <div onClick={() => setToggleAlert(!toggleAlert)} id="weatherAlert" className="spaceElementsLarge centerElementsContainer">
                  {weatherData.alerts.map((alert) => (
                    <div>
                      <h2 id="weatherAlertHeader"><b>WEATHER ALERT: {alert.event}</b></h2>
                      {toggleAlert && 
                        <div className="moreInfoWindow">
                          <p>Start: <b>{getTimeConversion(alert.start)}</b></p>
                          <p>End: <b>{getTimeConversion(alert.end)}</b></p>
                          <p><b>{alert.description}</b></p>
                          <p>From: <b>{alert.sender_name}</b></p>
                        </div>
                      }
                    </div>
                  ))}
                </div>
              }
            </div>

            <div className="flexRowContainer">

              <div id="leftCurrentWeatherData" className="centerElementsContainer">
                <div className="spaceElementsSuperSmall flexRowContainer">
                  <span className="spaceElementsSuperSmall">
                    <h3>{weatherData.current.weather[0].description.charAt(0).toUpperCase() + weatherData.current.weather[0].description.slice(1)}</h3>
                  </span>
                </div>
                <p><b>{weatherData.current.temp}&#176;</b></p>
                <p>Feels like: <b>{weatherData.current.feels_like}</b></p>
                <p><b>{weatherData.daily[0].temp.max}&#176; &#8593; {weatherData.daily[0].temp.min}&#176; &#8595;</b></p>
              </div>

              <div id="rightCurrentWeatherData" className="centerElementsContainer">
                {weatherData.current.wind_speed > 0
                  ?
                    <div id="windInfo">
                      <p>Wind speed: <b>{weatherData.current.wind_speed} mph</b></p>
                      {weatherData.current.wind_gust && <p>Wind gust: <b>{weatherData.current.wind_gust} mph</b></p>}
                      <p><b>{getWindDirection(parseInt(weatherData.current.wind_deg))}</b></p>
                    </div>
                  : 
                    <p>No wind</p>
                }
                

                <div id="splitspaceElementsLarge" className="flexRowContainer">
                  <div id="currentSunrise" className="spaceElementsLarge">
                    <p>Sunrise: <b>{getTimeConversion(weatherData.current.sunrise)}</b></p>
                  </div>

                  <div id="currentSunset" className="spaceElementsLarge">
                    <p>Sunset: <b>{getTimeConversion(weatherData.current.sunset)}</b></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }

      {weatherData && 
        <div id="hourlyAndDailyContainer" className="flexRowContainer">
          <div id="hourlyWeather">
            {weatherData.hourly.slice(0, 25).map((hour) => (
              <div className="hourDisplay">
                <HourDisplayUnit weatherData={hour} />
              </div>
            ))}
          </div>  

          <div id="emptyColumn">

          </div>

          <div id="dailyWeather">
            {weatherData.daily.map((day) => (
              <div className="dayDisplay">
                <DayDisplayUnit weatherData={day} />
              </div>
            ))}
          </div>
        </div>
      }
      </div>
      }
    </div>
  );
}

export default Location;
