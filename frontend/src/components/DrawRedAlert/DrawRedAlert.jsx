/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import ReactMapGl, { GeolocateControl, NavigationControl } from "react-map-gl";
import { useCookies } from "react-cookie";
import axios from "axios";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";

import "./DrawRedAlert.css";
import CreateRedAlert from "./CreateRedAlert";
import Alert from "./../Alert/Alert";
import { BASE_SERVER_URL, COOKIE } from "./../../config/constant";

const Map_Box_Token = process.env.REACT_APP_MAP_BOX_TOKEN;

export default function DrawRedAlert() {
    const [cookies] = useCookies(COOKIE);
    const [submitBtn, setSubmitBtn] = useState("Create");
    const [redAlertComponet, setRedAlertComponet] = useState(null);
    const [alertComponent, setAlertComponent] = useState(null);
    const [name, setName] = useState();

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

            map.addControl(drawRef.current, "top-right");

            map.on("draw.create", (event) => {
                const createdFeatures = event.features[0];
                mapGeometry.push(createdFeatures);
                setMapGeometry(mapGeometry);
                console.log(" event", event);
            });

            map.on("draw.delete", (event) => {
                const createdFeatures = event.features[0];
                const newMapGeometry = mapGeometry.filter(
                    (map) => map.id !== createdFeatures.id
                );
                setMapGeometry(newMapGeometry);
                console.log(" event delete", event);
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
    }, [mapRef.current, mapGeometry]);
    const handleViewportChange = (newViewport) => {
        setViewPort({ ...viewPort, ...newViewport });
    };

    const handleMapChange = () => {
        if (mapGeometry.length <= 0)
            return setAlertComponent(
                <Alert
                    text="Please Create the Red Alert Polygone."
                    AlertUseState={[alertComponent, setAlertComponent]}
                />
            );
        if (submitBtn === "Submit") {
            console.log("mapGeometry : ", mapGeometry);
            console.log("name : ", name);
            axios({
                method: "post",
                url: `${BASE_SERVER_URL}/alert-area`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies.jwt}`,
                },
                data: {
                    location: {
                        type: "FeatureCollection",
                        features: mapGeometry,
                    },
                    name: name,
                },
            })
                .then((response) => {
                    console.error(response);
                    if (response.status === 200) {
                        setAlertComponent(
                            <Alert
                                text="Alert Zone was created."
                                AlertUseState={[
                                    alertComponent,
                                    setAlertComponent,
                                ]}
                            />
                        );
                    } else {
                        setAlertComponent(
                            <Alert
                                text="Alert Zone not created."
                                AlertUseState={[
                                    alertComponent,
                                    setAlertComponent,
                                ]}
                            />
                        );
                    }
                    setSubmitBtn("Create");
                    setRedAlertComponet(null);
                })
                .catch((error) => {
                    console.error(error);
                });
            // setMapGeometry([]);
        } else if (submitBtn === "Create") {
            setRedAlertComponet(
                <CreateRedAlert
                    location={{
                        type: "FeatureCollection",
                        features: mapGeometry,
                    }}
                    submitBtnUseState={[submitBtn, setSubmitBtn]}
                    setRedAlertComponetUseState={[
                        redAlertComponet,
                        setRedAlertComponet,
                    ]}
                    nameUseState={[name, setName]}
                    viewPort={viewPort}
                />
            );
            setSubmitBtn("Submit");
        }
    };

    return (
        <div className="main">
            {alertComponent}
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
                    value={submitBtn}
                    onClick={() => handleMapChange()}
                />
                {redAlertComponet}
            </div>
        </div>
    );
}
