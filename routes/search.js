const express = require("express");

const {
  searchCity,
  searchZipcode,
  getWeather
} = require("../controllers/searchController");

const router = express.Router();

//search request for locations by city
router.get("/citySearch/:location", searchCity);

//search request for locations by zipcode
router.get("/zipcodeSearch/:location", searchZipcode);

//weather data request for area by coordinates
router.get("/getWeather/:lat/:lon", getWeather);

module.exports = router;
