const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const env = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/user");
const locationRoutes = require("./routes/location");
const searchRoutes = require("./routes/search");
const { response } = require("express");

//app.use(express.static(path.join(__dirname,"/frontend/build")));

/*
const PORT = process.env.PORT || 8080;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const DB_URI = process.env.DB_URI;
*/

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/locations", locationRoutes);
app.use("/search", searchRoutes);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("Database connection successful."))
  .catch((error) => {
    console.log("Database connection error:");
    console.log(error);
});

/*
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});
*/

app.listen(5000);
