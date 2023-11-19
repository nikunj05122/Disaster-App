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

    const mapRef = useRef(null);
    const drawRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current.getMap();
            drawRef.current = new MapboxDraw({
                // displayControlsDefault: false,
                controls: {
                    polygon: true,
                    trash: true,
                },
            });
            map.addControl(drawRef.current, "top-left");
            map.on("draw.create", (event) => {
                const createdFeatures = event.features;
                // Do something with the created features (e.g., access the drawn polygon)
                console.log("Drawn features:", createdFeatures);
            });
        }

        return () => {
            if (drawRef.current) {
                const map = mapRef.current.getMap();
                map.removeControl(drawRef.current);
            }
        };
    }, [mapRef]);

    const handleViewportChange = (newViewport) => {
        setViewPort({ ...viewPort, ...newViewport });
    };

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
                    onMove={(evt) => setViewPort(evt.viewState)}
                    onViewportChange={handleViewportChange}
                    ref={mapRef}
                >
                    <GeolocateControl
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation
                    />
                    <NavigationControl showCompass={true} />
                </ReactMapGl>
            </div>
        </div>
    );
}