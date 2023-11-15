import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGl, { Marker } from "react-map-gl";
import axios from "axios";

import "./style.css";
import { BASE_SERVER_URL } from "./../../config/constant";
import { locationTypeFilter } from "./../../utils/locationTypeFilter";
import search from "./../../assets/icons/search.svg";
import List from "./List";
const Map_Box_Token = process.env.REACT_APP_MAP_BOX_TOKEN;

export default function MainScreen() {
    // Map response
    const [mapData, setMapData] = useState(null);
    const [searchData, setSearchData] = useState();

    const [inputText, setInputText] = useState("");
    const inputHandler = (e) => {
        //convert input text to lower case
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    useEffect(() => {
        axios
            .get(
                `${BASE_SERVER_URL}/organization/nearest-organization/72.8838665679645,21.22240895512974`
            )
            .then((response) => {
                console.log("response", response.data);

                setMapData(response.data.data.departmentLocation);
                setSearchData(response.data.data.departmentLocation);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [viewPort, setViewPort] = useState({
        latitude: 21.22240895512974,
        longitude: 72.8838665679645,
        zoom: 11,
    });

    // Serch bar response

    return (
        <div className="main">
            <div className="search-bar">
                <img className="search-icon" src={search} alt="" />
                <input
                    type="search"
                    name="search"
                    id=""
                    onChange={inputHandler}
                    placeholder="Search"
                />
                <List
                    input={inputText}
                    location={searchData}
                    latlng={viewPort}
                />
            </div>
            <div className="map-container">
                <ReactMapGl
                    {...viewPort}
                    mapboxAccessToken={Map_Box_Token}
                    width="100%"
                    height="100%"
                    transitionDuration="200"
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    onMove={(evt) => setViewPort(evt.viewState)}
                    onViewPortChange={(viewPort) => setViewPort(viewPort)}
                >
                    {mapData &&
                        mapData.map((loc) => {
                            return (
                                <Marker
                                    key={loc.id}
                                    longitude={loc.location.coordinates[0]}
                                    latitude={loc.location.coordinates[1]}
                                >
                                    <img
                                        src={locationTypeFilter(loc.type)}
                                        alt=""
                                    />
                                </Marker>
                            );
                        })}
                </ReactMapGl>
            </div>
        </div>
    );
}
