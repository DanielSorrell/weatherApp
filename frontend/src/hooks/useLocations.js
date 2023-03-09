import { React, useState } from "react";
import { useLocationsContext } from "./useLocationsContext";
import { useUserAuthContext } from "./useUserAuthContext";

export const useLocations = () => {
  const { dispatch } = useLocationsContext();
  const [loading, setLoading] = useState(null);
  const { user } = useUserAuthContext();

  /**
   * Takes a location and saves to database if user 
   * is logged in and adds location to context.
   * @param {object} location - Object with information about a location
   */
  const addLocation = async (location) => {
    setLoading(true);
    
    if(user){

      const saveLocation = {
        jsonUserEmail: user.email,
        jsonLatCoords: location.latCoords, 
        jsonLongCoords: location.longCoords,
        jsonCity: location.city,
        jsonCountry: location.country,
        jsonState: location.state,
        jsonZipcode: location.zipcode 
      };

      const response = await fetch("http://localhost:5000/locations/add", {
        method: "POST",
        body: JSON.stringify(saveLocation),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      });

      const json = await response.json();
      if(!response.ok){
        setLoading(false);
        console.log("Error saving location"); 
        console.log(json.error);
      }
      if(response.ok){
        console.log(json);
        dispatch({type: "create_location", payload: location});
        setLoading(false);
      }
    } else {
      dispatch({type: "create_location", payload: location});
      setLoading(false);
    }
  }

   /**
   * Takes a location and deletes from account in database if user 
   * is logged in and deletes location from context.
   * @param {object} location - Object with information about a location
   */
  const deleteLocation = async (location) => {
    setLoading(true);
    if(user){

      const saveLocation = {
        jsonUserEmail: user.email,
        jsonLatCoords: location.latCoords,
        jsonLongCoords: location.longCoords
      };

      const response = await fetch("http://localhost:5000/locations/delete", {
        method: "DELETE",
        body: JSON.stringify(saveLocation),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      });

      const json = await response.json();
      if(!response.ok){
        setLoading(false);
        console.log("Error saving location"); 
        console.log(json.error);
      }
      if(response.ok){
        console.log(json);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  return {addLocation, deleteLocation};
}
