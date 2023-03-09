const express = require("express");

const {
  getLocations,
  createLocation,
  deleteLocation
} = require("../controllers/locationController");

const requireUserAuth = require("../middleware/requireUserAuth");
const router = express.Router();

//authenticate user
router.use(requireUserAuth);

//get all locations
router.get("/:email", getLocations);

//create a location
router.post("/add", createLocation);

//delete a location
router.delete("/delete", deleteLocation);

module.exports = router;
