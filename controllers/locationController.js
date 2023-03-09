const User = require("../models/userModel");
const Location = require("../models/locationModel");
const mongoose = require("mongoose");
const env = require("dotenv");
const { response } = require("express");
//env.config();
//const process.env.WEATHER_API_KEY = process.env.process.env.WEATHER_API_KEY;

/**
 * Takes a user email and if found in database returns saved locations.
 * @param {Object} req - Request object that contains the user email
 * @param {Object} res - Response object
 */
const getLocations = async (req, res) => {
  User.findOne({email: req.params.email}, function (error, foundUser){
    if(error){
      console.log("Error retrieving locations for " + req.user.email);
      res.status(400).json({error: error.message});
    } else {
      res.status(200).json(foundUser.locations);
    }
  });
};

/**
 * Takes a user email and location and adds location to user account in database. 
 * @param {Object} req - Request object that contains the user email and location
 * @param {Object} res - Response object
 */
const createLocation = async (req, res) => {
  User.findOne({email: req.body.jsonUserEmail}, function (error, user){
    if(error){
      console.log("Error adding city to user " + email);
      console.log(error.message);
      res.status(400).json({error: error.message});
    } else {
      const location = new Location ({
        latCoords: req.body.jsonLatCoords,
        longCoords: req.body.jsonLongCoords,
        city: req.body.jsonCity,
        country: req.body.jsonCountry,
        state: req.body.jsonState,
        zipcode: req.body.jsonZipcode
      });
      user.locations.push(location);
      user.save();
      res.status(200).json({message: "Success"});    
    }
  });
};

/**
 * Takes a user email and location and deletes the location from the user account in database. 
 * @param {Object} req - Request object that contains the user email and location
 * @param {Object} res - Response object
 */
const deleteLocation = async (req, res) => {
  User.findOne({email: req.body.jsonUserEmail}, function (error, user){
    if(error){
      res.status(400).json({error: error.message});
    } else {
      user.locations = user.locations.filter((location) => 
        location.latCoords !== req.body.jsonLatCoords &&
        location.longCoords !== req.body.jsonLongCoords
      );
      user.save();
      res.status(200);
    }
  });
};

module.exports = {
  getLocations,
  createLocation,
  deleteLocation
};
