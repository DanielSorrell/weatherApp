import { React, useState } from "react";

const SearchResult = ({result, setSelectedCity}) => {

    let inputId = result.name + ",";
    if(result.state){
        inputId += result.state + " ";
    }
    if(result.zipcode){
        inputId += result.zipcode = " ";
    }

    inputId += result.country;

    return(
        <li>
            <input id={inputId} className="searchResultOption" name="selectCity" type="radio" />
            <label 
            onClick={() => setSelectedCity({
                city: result.name,
                state: result.state,
                zipcode: result.zipcode,
                country: result.country,
                latCoords: result.lat,
                longCoords: result.lon
            })} 
            className="cityOptionContainer" 
            htmlFor={inputId}>
                {result.name}, {result.state && result.state} {result.zipcode && result.zipcode} {result.country}
            </label>
        </li>
    );

}

export default SearchResult;
