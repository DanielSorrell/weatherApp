const axios = require("axios");
const env = require("dotenv");
const { response } = require("express");

/**
 * Takes a user defined city and searches for matching location(s) if found.
 * @param {Object} req - Request object that contains the city
 * @param {Object} res - Response object
 */
const searchCity = async (req, res) => {
    const query = req.params.location;
    console.log("search request received for " + query);
  
    const searchCity = async () => {
      await axios({
        method: "get",
        url: "http://api.openweathermap.org/geo/1.0/direct?q=" + query + "&limit=5&appid=" + process.env.WEATHER_API_KEY
      }).then(response => {      
        if(!Array.isArray(response.data)){
          res.status(200).json([response.data]);
        } else {
          let searchResults = [];
          let uniqueCoordinates = new Map();
          for(location of response.data){
            //if a previous search result contains current coordinates, 
            //skip current result to avoid duplicate results
            if(uniqueCoordinates.has(location.lat)){
              if(uniqueCoordinates.get(location.lat) == location.long){
                continue;
              }
            }
            uniqueCoordinates.set(location.lat, location.long);
            searchResults.push(location);
          }
          res.status(200).json(searchResults);
        }
      }).catch(error => {
        console.log("error:");
        console.log(error);
        res.status(400).json(error);
      });
    };
    searchCity();
};

/**
 * Takes a user defined zipcode and searches for matching location(s) if found.
 * @param {Object} req - Request object that contains the zipcode
 * @param {Object} res - Response object
 */
const searchZipcode = async (req, res) => {
    const query = req.params.location;
    console.log("search request received for " + query);
    
    const searchZipcode = async () => {
      await axios({
        method: "get",
        url: "http://api.openweathermap.org/geo/1.0/zip?zip=" + query + "&appid=" + process.env.WEATHER_API_KEY
      }).then(response => {
        if(Array.isArray(response.data)){
          res.status(200).json(response.data);
        } else {
          res.status(200).json([response.data]);
        }
      }).catch(error => {
        res.status(400).json(error);
      });
    };
    searchZipcode();
};

/**
 * Takes latitude and longitude coordinates and retrieves the weather information for that area.
 * @param {Object} req - Request object that contains the coordinates
 * @param {Object} res - Response object
 */
const getWeather = async (req, res) => {
    const latCoords = req.params.lat;
    const longCoords = req.params.lon;  
    const getWeatherData = async () => {
      await axios({
        method: "get",
        url: "https://api.openweathermap.org/data/3.0/onecall?lat=" + latCoords + "&lon=" + longCoords + "&units=imperial&exclude=minutely" + "&appid=" + process.env.WEATHER_API_KEY
      }).then(response => {
        res.status(200).json(response.data);
      }).catch(error => {
        res.status(400).json(error);
      });
    }
    getWeatherData();
};

module.exports = {
  searchCity,
  searchZipcode,
  getWeather
};
