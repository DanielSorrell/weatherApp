import { createContext, useReducer, useEffect } from "react";

export const LocationsContext = createContext();

export const locationsReducer = (state, action) => {
  switch(action.type) {
    //set locations from account in database or previously saved local storage
    case "set_locations":
      console.log("locations set to:");
      console.log(action.payload);
      localStorage.setItem("locations", JSON.stringify(action.payload));
      return {
        locations: action.payload
      };
    //add location to local storage and context
    case "create_location":
      if(state.locations){
        localStorage.setItem("locations", JSON.stringify([action.payload, ...state.locations]));
        return {
          locations: [action.payload, ...state.locations]
        };
      } else {
        localStorage.setItem("locations", JSON.stringify([action.payload]));
        return {
          locations: [action.payload]
        };
      }
    //delete location from context and local storage
    case "delete_location":
      console.log("deleting...");
      let deleteUpdate = state.locations.filter((location) => 
        location.latCoords !== action.payload.latCoords && 
        location.longCoords !== action.payload.longCoords
      );
      localStorage.setItem("locations", JSON.stringify(deleteUpdate));
      return {
        locations: deleteUpdate
      };
    default:
      return state;
  }
}

export const LocationsContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(locationsReducer, {
    locations: null
  });

  //Check for previously saved locations from local storage
  useEffect(() => {
    const locations = JSON.parse(localStorage.getItem("locations"));
    if(locations){
      dispatch({ type: "set_locations", payload: locations });
    }
  }, []);

  console.log("Location context status:");
  console.log(state);
  if(state){
    console.log("Truthy state");
  } else {
    console.log("Falsy state");
  }

  return (
    <LocationsContext.Provider value ={{...state, dispatch}}>
      {children}
    </LocationsContext.Provider>
  );
}
