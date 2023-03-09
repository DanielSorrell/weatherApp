const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  latCoords: {
    type: Number,
    required: true,
  },
  longCoords: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
  },
  zipcode: {
    type: String
  }
});

module.exports = mongoose.model("Location", locationSchema);
