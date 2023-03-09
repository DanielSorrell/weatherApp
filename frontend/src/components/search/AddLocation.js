import { React, useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useLocationsContext } from "../../hooks/useLocationsContext";
import { useLocations } from "../../hooks/useLocations";
import { useUserAuthContext } from "../../hooks/useUserAuthContext";
import { Link } from "react-router-dom";
import SearchResult from "./SearchResult";
import Footer from "../partials/Footer.js";
import Header from "../partials/Header.js";

const AddLocation = () => {
    const { locations } = useLocationsContext();
    const { dispatch } = useLocationsContext();
    const { user } = useUserAuthContext();
    const {addLocation, deleteLocation} = useLocations();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [searchResults, setSearchResults] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [searchState, setSearchState] = useState("");
    const [searchZipcode, setSearchZipcode] = useState("");
    const [searchCountry, setSearchCountry] = useState("");
    const [searchFilter, setSearchFilter] = useState(false);
    const [searchForm, setSearchForm] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    
    //if searchFilter is changed, clear previous inputs
    useEffect(() => {
        if(searchFilter){
            setSearchCity("");
            setSearchState("");
            setSearchCountry("");
        } else {
            setSearchZipcode("");
            setSearchCountry("");
        }
    }, [searchFilter]);

    /**
     * Takes location search inputs and returns search results.
     * @param {object} e - onSubmit event to start search
     */
    const handleSearchSubmit = async (e) => {
        setSelectedCity("");
        setIsLoading(true);
        e.preventDefault();
        let parameters;

        //search by city if search filter is unchecked
        if(!searchFilter){
            console.log("city search");
            parameters = searchCity;
            if(searchState){
                parameters += "," + searchState;
            }
            if(searchCountry){
                parameters += "," + searchCountry;
            }
            const response = await fetch("http://localhost:5000/search/citySearch/" + parameters,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const json = await response.json();
            if(response.ok){
                console.log(response.status);
                setIsLoading(false);
                if(json.length === 0){
                    setSearchResults(<p className="error">No matches found for {parameters.replaceAll(",", ", ")}</p>);
                } else {
                    const mappedResults = 
                    <ul id="searchResultList">
                        {json.map((result) => (
                            <SearchResult result={result} setSelectedCity={setSelectedCity} />
                        ))}
                    </ul>;
                    setSearchResults(mappedResults);
                }
            }
            if(!response.ok){
                setIsLoading(false);
                setSearchResults(<p className="error">Error searching for {parameters.replaceAll(",", ", ")}</p>);
                console.log("error");
                console.log(json.error);
            }
        } else {
            //search by zipcode if search filter is checked
            console.log("zipcode search");
            parameters = searchZipcode;
            if(searchCountry){
                parameters += "," + searchCountry;
            }
            const response = await fetch("http://localhost:5000/search/zipcodeSearch/" + parameters,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }
            );
            const json = await response.json();
            if(response.ok){
                console.log(response.status);
                setIsLoading(false);
                if(json.length === 0){
                    setSearchResults(<p className="error">No matches found for {parameters.replaceAll(",", ", ")}</p>);
                } else {
                    const mappedResults = 
                    <ul id="searchResultList">
                        {json.map((result) => (
                            <SearchResult result={result} setSelectedCity={setSelectedCity} />
                        ))}
                    </ul>;
                    setSearchResults(mappedResults);
                }
            }
            if(!response.ok){
                setIsLoading(false);
                setSearchResults(<p className="error">Error searching for {parameters.replaceAll(",", ", ")}</p>);
                console.log("error");
                console.log(json.error);
            }
        }
    }

    const selectCity = async (e) => {
        //add city to locations list and redirect to display its weather data
        await addLocation(selectedCity);
        navigate("/weather");
    }

    return(
        <div>

            <Header />

            <div className="centerElementsContainer">

                {locations && <button onClick={() => navigate("/weather")}>Back</button>}
                
                <div id="searchEngineContainer" className="centerElementsContainer">
                    <h3>Search by:</h3>
                    <div className="searchFilterContainer">
                        <span className="searchFilterButton"> 
                            City
                        </span>
                        <div className="searchFilterButton"> 
                            <label className="switch">
                                <input type="checkbox" onChange={() => setSearchFilter(!searchFilter)}/>
                                <span className="slider"></span>
                            </label>
                        </div>
                        <span className="searchFilterButton"> 
                            Zipcode (US)
                        </span>
                    </div>
                    <form className="searchLocation" onSubmit={handleSearchSubmit}>

                        {searchFilter ? 
                            <div>
                                <label>Zipcode: (required)</label>
                                <input
                                    className="locationSearchInput"
                                    type="text"
                                    onChange={(e) => setSearchZipcode(e.target.value)}
                                    value={searchZipcode}
                                />
                            </div>
                        : 
                            <div>
                                <label>City: (required)</label>
                                <input
                                    className="locationSearchInput"
                                    type="text"
                                    onChange={(e) => setSearchCity(e.target.value)}
                                    value={searchCity}
                                />
                                            
                                <label>State (US only): (optional)</label>
                                <input
                                    className="locationSearchInput"
                                    type="text"
                                    onChange={(e) => setSearchState(e.target.value)}
                                    value={searchState}
                                />
                            </div>
                        }

                        {searchForm}

                        {/* Make country drop down searchable list for country codes */}
                        <label>Country: (optional)</label>
                        <input
                            className="locationSearchInput"
                            type="text"
                            onChange={(e) => setSearchCountry(e.target.value)}
                            value={searchCountry}
                        />

                        <button className="searchButton">Search</button>
                        {error && <h3 className="error">{error}</h3>}
                    </form>
                </div>
            
            </div>
             
            {isLoading ?
                <div className="loading">
                    <div>Loading search results...</div>
                        <div>
                            <ReactLoading type={"spin"} color={"#0468F9"} />
                        </div>
                </div>
                :
                <div>
                    {searchResults && 
                        <div>
                            <div id="searchResultsContainer">
                                {searchResults}
                            </div>
                            {selectedCity && 
                                <button id="addCityButton" onClick={selectCity}>Add city</button>
                            }
                        </div>
                    }
                </div>
            }

        </div>
    );

}

export default AddLocation;