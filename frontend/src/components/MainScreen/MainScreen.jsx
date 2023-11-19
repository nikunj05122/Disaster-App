/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGl, { Marker } from "react-map-gl";
import axios from "axios";

import "./Mainscreen.css";
import List from "./List";
import { BASE_SERVER_URL } from "./../../config/constant";
import { locationTypeFilter } from "./../../utils/locationTypeFilter";
import search from "./../../assets/icons/search.svg";
import noImage from "./../../assets/icons/noImage.svg";
import cancel from "./../../assets/icons/cancel.svg";

const Map_Box_Token = process.env.REACT_APP_MAP_BOX_TOKEN;

export default function MainScreen() {
    const [mapData, setMapData] = useState(null);
    const [searchData, setSearchData] = useState();
    const [locationDetails, setLocationDetails] = useState(null);

    const [inputText, setInputText] = useState("");
    const [viewPort, setViewPort] = useState({
        latitude: 21.22240895512974,
        longitude: 72.8838665679645,
        zoom: 11,
    });

    const inputHandler = (e) => {
        //convert input text to lower case
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const onClickMarker = (loc) => {
        setLocationDetails(loc);
    };

    useEffect(() => {
        axios
            .get(
                `${BASE_SERVER_URL}/organization/nearest-organization/${viewPort.longitude},${viewPort.latitude}`
            )
            .then((response) => {
                console.log("response", response.data);

                const department = [
                    ...response.data.data.department.map(
                        (data) => data.departments
                    ),
                ];
                setMapData(department.flat());
                setSearchData(response.data.data.departmentLocation);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
                                    key={loc._id}
                                    longitude={loc.location.coordinates[0]}
                                    latitude={loc.location.coordinates[1]}
                                    onClick={() => onClickMarker(loc)}
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

            {locationDetails && (
                <div className="department-card">
                    <div className="department-img">
                        {locationDetails.img ? (
                            <img src={locationDetails?.img?.URL} alt="" />
                        ) : (
                            <img src={noImage} alt="" />
                        )}
                    </div>
                    <div className="department-detail">
                        <div className="dept-container">
                            <div className="dept-title">Name</div>
                            <div className="dept-value">
                                {locationDetails.name}
                            </div>
                        </div>
                        <div className="dept-container">
                            <div className="dept-title">Address</div>
                            <div className="dept-value">
                                {locationDetails.address}
                            </div>
                        </div>
                        <div className="dept-container">
                            <div className="dept-title">State</div>
                            <div className="dept-value">
                                {locationDetails.state}
                            </div>
                        </div>
                        <div className="dept-container">
                            <div className="dept-title">City</div>
                            <div className="dept-value">
                                {locationDetails.city}
                            </div>
                        </div>
                        <div className="dept-container">
                            <div className="dept-title">Vehicles</div>
                            <div className="dept-value">
                                {locationDetails.vehicles &&
                                locationDetails.vehicles.length > 0
                                    ? locationDetails.vehicles.reduce(
                                          (total, data) => total + data.count,
                                          0
                                      )
                                    : 0}
                            </div>
                        </div>
                        <div className="dept-container">
                            <div className="dept-title">Number</div>
                            <div className="dept-value">
                                {locationDetails.number
                                    .map((num) => num.split("+91")[1])
                                    .join(" | ")}
                            </div>
                        </div>
                    </div>
                    <div
                        className="dept-card-remove"
                        onClick={() => onClickMarker(null)}
                    >
                        <img src={cancel} alt="" />
                    </div>
                </div>
            )}
        </div>
    );
}
