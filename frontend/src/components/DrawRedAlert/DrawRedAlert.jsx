/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import ReactMapGl, { GeolocateControl, NavigationControl } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

import "./DrawRedAlert.css";

const Map_Box_Token = process.env.REACT_APP_MAP_BOX_TOKEN;

export default function DrawRedAlert() {
    const [viewPort, setViewPort] = useState({
        latitude: 21.22240895512974,
        longitude: 72.8838665679645,
        zoom: 11,
    });

    const [mapGeometry, setMapGeometry] = useState([]);

    const mapRef = useRef(null);
    const drawRef = useRef(null);

    useEffect(() => {
        if (mapRef.current && mapRef.current.getMap) {
            const map = mapRef.current.getMap();

            drawRef.current = new MapboxDraw({
                displayControlsDefault: false,
                controls: {
                    // point: true,
                    // line_string: true,
                    polygon: true,
                    trash: true,
                },
            });

            map.addControl(drawRef.current, "top-left");

            map.on("draw.create", (event) => {
                const createdFeatures = event.features[0];
                mapGeometry.push(createdFeatures);
                setMapGeometry(mapGeometry);
                console.log(mapGeometry);
            });
        } else {
            mapRef.current = {
                getMap: () => ({
                    addControl: () => {},
                    removeControl: () => {},
                }), // Placeholder functions
            };
        }

        return () => {
            if (drawRef.current && mapRef.current && mapRef.current.getMap) {
                const map = mapRef.current.getMap();
                map.removeControl(drawRef.current);
            }
        };
    }, [mapRef.current]);
    const handleViewportChange = (newViewport) => {
        setViewPort({ ...viewPort, ...newViewport });
    };

    const handleMapChange = () => {};

    return (
        <div className="main">
            <div className="map-container">
                <ReactMapGl
                    {...viewPort}
                    mapboxAccessToken={Map_Box_Token}
                    width="100%"
                    height="100%"
                    projection="globe"
                    transitionDuration="200"
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    ref={mapRef}
                    onMove={(evt) => setViewPort(evt.viewState)}
                    onViewportChange={handleViewportChange}
                >
                    <GeolocateControl
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation
                        showUserHeading
                    />
                    <NavigationControl showCompass={true} />
                </ReactMapGl>
                <input
                    className="submit-btn"
                    type="submit"
                    value="Submit"
                    onClick={() => handleMapChange()}
                />
            </div>
        </div>
    );
}
