import { React, useState, useEffect } from "react";

const HourDisplayUnit = ({ weatherData }) => {
  const [toggleWindow, setToggleWindow] = useState(false);
  const [className, setClassName] = useState("");

   /**
   * Takes a Unix UTC timestamp and converts to the hour in meridiem time.
   * @param {int} timeStamp - int of Unix UTC timestamp 
   * @returns {String} String of the hour in meridiem time
   */
  const getHourConversion = (timeStamp) => {
    let hour = new Date(timeStamp * 1000);
    hour = hour.toLocaleTimeString("default");
    const hourNum = hour.substring(0, hour.indexOf(":"));
    const meridiem = hour.substring(hour.length - 2, hour.length);
    return hourNum + " " + meridiem;
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
   * Takes a meter measurement and converts to kilometers
   * if greater than or equal to 1000 meters.
   * @param {int} meters - kilometer measurement 
   * @returns {string} String with kilometer or meter measurement indicator
   */
  const getVisibility = (meters) => {
    let visibility;
    if(meters >= 1000){
      visibility = meters / 1000 + " km";
    } else {
      visibility += " m";
    }
    return visibility;
  }

  /**
   * Takes a angle in degrees of the wind direction and converts to cardinal direction.
   * @param {int} degree - degree of wind direction  
   * @returns {string} String of wind direction in cardinal direction.
   */
  const getWindDirection = (degree) => {
    let direction;

    if(degree > 15 && degree <= 75){
      direction = "NE";
    } else if(degree > 75 && degree <= 105){
      direction = "E";
    } else if(degree > 105 && degree <= 165){
      direction = "SE";
    } else if(degree > 165 && degree <= 195){
      direction = "S";
    } else if(degree > 195 && degree <= 255){
      direction = "SW";
    } else if(degree > 255 && degree <= 345){
      direction = "NW";
    } else if((degree > 345 && degree <= 360) || (degree >= 0 && degree <= 15)){
      direction = "N";
    } else {
      direction = "Error finding wind direction";
    }
    return direction;
  }

  //expand drop down menu of more information for the hourly weather information
  useEffect(() => {
    if(toggleWindow){
      setClassName("expandedParent");
    } else {
      setClassName("");
    }
  }, [toggleWindow]);

  return (
    <div onClick={() => setToggleWindow(!toggleWindow)} className={className}>
        <div className="hourDisplay flexRowContainer">
          <span className="spaceElementsSmall"><b>{getHourConversion(weatherData.dt)}</b></span>
          <span className="spaceElementsSmall"><img src={getImageSrc(weatherData.weather[0].icon)} alt={weatherData.weather[0].description} /></span>
          <span className="spaceElementsSmall"><b>{weatherData.temp}&#176;</b></span>
          <span className="spaceElementsSmall">
            {weatherData.pop > 0 ?
              <span><b>{Math.round((weatherData.pop + Number.EPSILON) * 100)}&#37;</b> chance </span>
              :
              <span>No </span>
            }
            precipitation
          </span>
        </div>

        {toggleWindow && 
          <div className="moreInfoWindow hourDisplay flexRowContainer">
            <span className="moreInfoContainers">
              <b>{weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}</b>
            </span>
            <span className="moreInfoContainers">
              Feels like: <b>{weatherData.feels_like}&#176;</b>
            </span>

            {weatherData.rain && 
              <span className="windowItem">
                Rain: <b>{(Number(Object.values(weatherData.rain)[0]) / 25.4).toFixed(3)} inches</b>
              </span>
            }

            {weatherData.snow && 
              <span className="windowItem">
                Snow: <b>{(Number(Object.values(weatherData.snow)[0]) / 25.4).toFixed(3)} inches</b>
              </span>
            }

            <span className="moreInfoContainers">
              Pressure: <b>{weatherData.pressure} hPa</b>
            </span>
            <span className="moreInfoContainers">
              Humidity: <b>{weatherData.humidity}&#37;</b>
            </span>
            <span className="moreInfoContainers">
              UV Index: <b>{weatherData.uvi}</b>
            </span>
            <span className="moreInfoContainers">
              Cloudiness: <b>{weatherData.clouds}&#37;</b>
            </span>
            <span className="moreInfoContainers">
              Visibility: <b>{getVisibility(weatherData.visibility)}</b>
            </span>
            <span className="moreInfoContainers">
              Wind speed: <b>{weatherData.wind_speed} mph {getWindDirection(weatherData.wind_deg)}</b>
            </span>
            {weatherData.wind_gust && 
              <span className="moreInfoContainers">
                Wind gust: <b>{weatherData.wind_gust} mph</b>
              </span>
            }
          </div>
        }
    </div>
  );
}

export default HourDisplayUnit;
