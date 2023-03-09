import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useLocationsContext } from "../hooks/useLocationsContext";
import { useLocations } from "../hooks/useLocations";
import { useUserAuthContext } from "../hooks/useUserAuthContext";
import { useNavigate } from "react-router-dom";
import Location from "./Location.js";
import AddLocation from "./search/AddLocation.js";
import Header from "./partials/Header.js";
import Footer from "./partials/Footer.js";

import clearSkies from "../videos/clear sky.mp4";
import clouds from "../videos/clouds.mp4";
import rain from "../videos/rain.mp4";
import snowfall from "../videos/snowfall.mp4";
import thunderstorm from "../videos/snowfall.mp4";
import ash from "../videos/ash.mp4";
import mist from "../videos/mist.mp4";
import smoke from "../videos/smoke.mp4";
import dust from "../videos/dust.mp4";
import fog from "../videos/fog.mp4";
import sand from "../videos/sand.mp4";
import squall from "../videos/squall.mp4";
import tornado from "../videos/tornado.mp4";

const Weather = () => {

  const { user } = useUserAuthContext();
  const { locations, dispatch } = useLocationsContext();
  const [isLoading, setIsLoading] = useState(false);
  const [mappedLocations, setMappedLocations] = useState();
  const [currentCity, setCurrentCity] = useState();
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [locationSelection, setLocationSelection] = useState();
  const [videoBackground, setVideoBackground] = useState("");
  const {addLocation, deleteLocation} = useLocations();
  const navigate = useNavigate();

  //Fetch account locations if user is logged in
  useEffect(() => {
    const getLocations = async () => {
      console.log("Loading locations for " + user.email);
      const response = await fetch("http://localhost:5000/locations/" + user.email, {
        headers: {"Authorization": `Bearer ${user.token}`},
      });
      const json = await response.json();
      if(response.ok){
        console.log(json); 
        dispatch({type: "set_locations", payload: json});
      }
      //catch error here or in location hook
      if(!response.ok){
        console.log("Error retrieving locations for " + user.email);
        console.log(json.error);
      }
    }
    if(user){
      getLocations();
    }
  }, [dispatch, user]);

  //Set first location to current location by default
  //each time the location selection is changed
  useEffect(() => {
    if(locations){
      setCurrentCity(locations[0]);
    }
  }, [locations]);

  //Filter location selection to not include the current city
  //every time the current city changes
  useEffect(() => {
    if(locations){
      if(locations.length > 1){
        setLocationSelection(locations.filter((location) => location !== currentCity));
      } else {
        setLocationSelection(locations);
      }
    } else {
      setCurrentCity(null);
      setVideoBackground("");
    }
  }, [currentCity, locations]);

  //Close drop down menu of locations and change the current city
  const selectCity = (city) => {
    setDropdownMenuOpen(false);
    setCurrentCity(city);
  }

  //Delete city from location selection
  const deleteCity = async (city) => {
    dispatch({type: "delete_location", payload: city});
    await deleteLocation(city);
  }

  /**
   * Takes a 3 digit weather ID and changes 
   * page background to corresponding weather video background.
   * @param {string} weatherId - String of 3 digit weather ID
   */
  const getVideoBackground = (weatherId) => {
    const id = weatherId.toString();

    if(id.charAt(0) === "2"){
      setVideoBackground(thunderstorm);
    } else if(id.charAt(0) === "3" || id.charAt(0) === "5"){
      setVideoBackground(rain);
    } else if(id.charAt(0) === "6"){
      setVideoBackground(snowfall);
    } else if(id === "701"){
      setVideoBackground(mist);
    } else if(id === "711"){
      setVideoBackground(smoke);
    } else if(id === "721" || id === "741"){
      setVideoBackground(fog);
    } else if(id === "731" || id === "761"){
      setVideoBackground(dust);
    } else if(id === "751"){
      setVideoBackground(sand);
    } else if(id === "762"){
      setVideoBackground(ash);
    } else if(id === "771"){
      setVideoBackground(squall);
    } else if(id === "781"){
      setVideoBackground(tornado);
    } else if(id === "800"){
      setVideoBackground(clearSkies);
    } else if(weatherId > 800){
      setVideoBackground(clouds);
    } else {
      setVideoBackground("");
    }
  }

  let footerDisplay;
  if(locations == null){
    footerDisplay = "footerContainerAbs";
  } else {
    footerDisplay = "footerContainer";
  }

  return (
      <div id="fillPage">   

        <video src={videoBackground} type="video/mp4" autoPlay muted loop className="videoBackground">
        </video>

        <Header />

        <div id="cityNavigation">
          {locations ? 
            <div id="citySelection" className="flexColumnContainer centerElementsContainer">
              {locations.length <= 4 ?
                <button id="changeCityButton" className="cityNavigationOption" onClick={() => navigate("/addLocation")}>Add another city</button>
                :
                <p id="maxCityLimitAlert">Maximum city limit of 5 reached. Delete a city to make space</p>
              }
                {locations.length > 1 && 
                  <div id="citySelectionDropDownContainer">
                    <button id="changeCityButton" className="cityNavigationOption" onClick={() => setDropdownMenuOpen(!dropdownMenuOpen)}>Change city</button>
                    {dropdownMenuOpen && 
                      <div id="dropdownMenu">
                        {locationSelection.map((location) => (
                          <div className="dropdownMenuOption" onClick={() => selectCity(location)}>
                            {location.city}, {location.state && location.state} {location.country} {location.zipcode && location.zipcode}
                            <button id="deleteCityButton" onClick={() => deleteCity(location)}>Delete city</button>
                          </div>
                        ))}
                      </div>
                    }
                  </div>
                }
            </div>
            : 
            <div className="centerElementsContainer">
              <button id="addFirstCityButton" className="cityNavigationOption" onClick={() => navigate("/addLocation")}>Add a city</button>
            </div>
          }
        </div>  

        {currentCity && 
          <div id="currentCityView">
              <Location details={currentCity} getVideoBackground={getVideoBackground} isLoading={isLoading} setIsLoading={setIsLoading}/>
          </div>
        }
        

        <Footer orientation={footerDisplay} />
            
      </div>
  );
}

export default Weather;
