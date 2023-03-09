import {LocationsContext} from "../context/LocationsContext.js";
import {useContext} from "react";

export const useLocationsContext = () => {
  const context = useContext(LocationsContext);

  
  if(!context){
    throw Error("useLocationsContext must be used inside an LocationContextProvider");
  }
  

  return context;
}
