import { React, useState, useEffect } from "react";

const DayDisplayUnit = ({ weatherData }) => {
  const [toggleWindow, setToggleWindow] = useState(false);
  const [className, setClassName] = useState("");

  /**
   * Takes a Unix UTC timestamp and converts to meridiem time.
   * @param {Number} timeStamp - int of Unix UTC timestamp 
   * @returns {String} String of meridiem time
   */
  const getTimeConversion = (timeStamp) => {
    let conversion = new Date(timeStamp * 1000);
    conversion = conversion.toLocaleTimeString("default");
    return conversion.substring(0, conversion.length - 6) + " " + conversion.substring(conversion.length - 2, conversion.length);
    //return conversion.toLocaleTimeString("default");
  }

  /**
   * Takes a Unix UTC timestamp and converts to day of the week, month, and numbered day.
   * @param {int} timeStamp - int of Unix UTC timestamp 
   * @returns {String} String of day of the week, month, and numbered day
   */
  const getDayConversion = (timeStamp) => {
    const dateObj = new Date(timeStamp * 1000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    options.timeZone = "UTC";
    options.timeZoneName = "short";
    const time = dateObj.toLocaleDateString("en-US", options);
    const day = time.substring(0, time.lastIndexOf(","));
    return day;
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

  //expand drop down menu of more information for the daily weather information
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
          <span className="spaceElementsSmall">{getDayConversion(weatherData.dt)}</span>
          <span className="spaceElementsSmall"><img src={getImageSrc(weatherData.weather[0].icon)} alt={weatherData.weather[0].description} /></span>
          <span className="spaceElementsSmall"><b>&#8593; {weatherData.temp.max}&#176;</b></span>
          <span className="spaceElementsSmall"><b>&#8595; {weatherData.temp.min}&#176;</b></span>
        </div>

        {toggleWindow && 
          <div className="moreInfoWindow hourDisplay flexRowContainer">
            <span className="windowItem">
              <p><b>{weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}</b></p>
              <p>Sunrise: <b>{getTimeConversion(weatherData.sunrise)}</b></p>
              <p>Sunset: <b>{getTimeConversion(weatherData.sunset)}</b></p>
            </span>
            
            <span className="windowItem">
              <p>Moonrise: <b>{getTimeConversion(weatherData.moonrise)}</b></p>
              <p>Moonset: <b>{getTimeConversion(weatherData.moonset)}</b></p>
              { /* Function to display moon img/desc from number*/}
              <p>Moon phase: <b>{weatherData.moon_phase}</b></p>
            </span>

            {weatherData.rain && 
              <span className="windowItem">
                <p>Rain: <b>{(weatherData.rain / 25.4).toFixed(3)} inches</b></p>
              </span>
            }

            {weatherData.snow && 
              <span className="windowItem">
                <p>Snow: <b>{(weatherData.snow / 25.4).toFixed(3)} inches</b></p>
              </span>
            }

            <span className="windowItem">
              <p>Humidity: <b>{weatherData.humidity}</b></p>
              <p>UV Index: <b>{weatherData.uvi}</b></p>
            </span>
            <span className="windowItem">
              <p>Pressure: <b>{weatherData.pressure} hPa</b></p>
              <p>Cloudiness: <b>{weatherData.clouds}&#37;</b></p>
            </span>
            <span className="windowItem">
              <p>Wind speed: <b>{weatherData.wind_speed} mph {getWindDirection(weatherData.wind_deg)}</b></p>
              {weatherData.wind_gust && 
                <p>Wind gust: <b>{weatherData.wind_gust} mph</b></p>
              }
            </span>
          </div>
        }
    </div>
  );
}

export default DayDisplayUnit;
