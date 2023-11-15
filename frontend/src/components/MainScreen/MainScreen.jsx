import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGl, { Marker } from "react-map-gl";
import axios from "axios";
import "./style.css";
import { BASE_SERVER_URL } from "./../../config/constant";
import { locationTypeFilter } from "./../../utils/locationTypeFilter";
const Map_Box_Token = process.env.REACT_APP_MAP_BOX_TOKEN;

export default function MainScreen() {
    const [res, setRes] = useState(null);

    useEffect(() => {
        axios
            .get(
                `${BASE_SERVER_URL}/organization/nearest-organization/72.8838665679645,21.22240895512974`
            )
            .then((response) => {
                console.log("response", response.data);

                setRes(response.data);
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

    return (
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
                {res &&
                    res.data.departmentLocation.map((loc) => {
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
    );
}
