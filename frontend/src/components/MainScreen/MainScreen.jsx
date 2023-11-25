/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGl, {
    Marker,
    GeolocateControl,
    NavigationControl,
} from "react-map-gl";
import axios from "axios";
import { onMessage } from "firebase/messaging";
import { useLocation } from "react-router-dom";

import { messaging } from "./../../config/firebase";
import "./Mainscreen.css";
import List from "./List";
import RedAlert from "./RedAlert";
import DeptCard from "./DeptCard";
import AlertCard from "./AlertCard";
import { BASE_SERVER_URL, ALERT } from "./../../config/constant";
import { locationTypeFilter } from "./../../utils/locationTypeFilter";
import search from "./../../assets/icons/search.svg";

const Map_Box_Token = process.env.REACT_APP_MAP_BOX_TOKEN;

export default function MainScreen() {
    const [alertPoint, setAlertPoint] = useState([]);

    const receivedData = localStorage.getItem("notificationData")
        ? JSON.parse(localStorage.getItem("notificationData"))
        : [];
    // console.log("receivedData :", receivedData);

    // console.log("receivedData", receivedData);
    async function requestPermission() {
        const permissions = await Notification.requestPermission();
        if (permissions === "granted") {
            // alert("Ypu accespt for notifiaction");
            onMessage(messaging, (payload) => {
                console.log("Message received. ", payload.data.operation);
                receivedData.push(JSON.parse(payload.data.operation));
                localStorage.setItem(
                    "notificationData",
                    JSON.stringify(receivedData)
                );
            });
        } else if (permissions === "denied") {
            alert("Ypu denied for notifiaction");
        }
        setAlertPoint(receivedData);
    }
    useEffect(() => {
        requestPermission();
    }, [receivedData]);

    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const notification = queryParams.get("notificationData");

        if (notification) {
            receivedData.push(JSON.parse(notification));
            localStorage.setItem(
                "notificationData",
                JSON.stringify(receivedData)
            );
            // Handle the notification data as needed
            setAlertPoint(receivedData);
        }
    }, [location.search]);

    const [mapData, setMapData] = useState(null);

    const [searchData, setSearchData] = useState();
    const [featureCollections, setFeatureCollections] = useState();
    const [deptCard, setDeptCard] = useState();

    const [inputText, setInputText] = useState("");
    const [viewPort, setViewPort] = useState({
        latitude: 21.22240895512974,
        longitude: 72.8838665679645,
        zoom: 11,
    });

    const inputHandler = (e) => {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    useEffect(() => {
        axios
            .get(
                `${BASE_SERVER_URL}/organization/nearest-organization/${viewPort.longitude},${viewPort.latitude}`
            )
            .then((response) => {
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
        axios
            .get(`${BASE_SERVER_URL}/alert-area`)
            .then((response) => {
                setFeatureCollections(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
                    deptCardUseState={[deptCard, setDeptCard]}
                />
            </div>
            <div className="map-container">
                <ReactMapGl
                    {...viewPort}
                    mapboxAccessToken={Map_Box_Token}
                    width="100%"
                    height="100%"
                    transitionDuration="200"
                    projection="globe"
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    onMove={(evt) => setViewPort(evt.viewState)}
                    onViewPortChange={(viewPort) => setViewPort(viewPort)}
                >
                    <GeolocateControl
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation
                    />
                    <NavigationControl showCompass={false} />
                    {featureCollections && (
                        <RedAlert featureCollections={featureCollections} />
                    )}
                    {alertPoint &&
                        alertPoint.length > 0 &&
                        alertPoint.map((loc) => {
                            return (
                                <Marker
                                    key={loc.operationId}
                                    longitude={loc.location[0]}
                                    latitude={loc.location[1]}
                                    // onClick={() =>
                                    //     setDeptCard(
                                    //         <DeptCard
                                    //             organizationId={loc._idoperationId}
                                    //         />
                                    //     )
                                    // }
                                >
                                    <img
                                        src={locationTypeFilter(ALERT)}
                                        alt=""
                                    />
                                </Marker>
                            );
                        })}
                    {mapData &&
                        mapData.length > 0 &&
                        mapData.map((loc) => {
                            return (
                                <Marker
                                    key={loc._id}
                                    longitude={loc.location.coordinates[0]}
                                    latitude={loc.location.coordinates[1]}
                                    onClick={() =>
                                        setDeptCard(
                                            <DeptCard
                                                organizationId={loc._id}
                                            />
                                        )
                                    }
                                >
                                    <img
                                        // style={{ opacity: 0.5 }}
                                        src={locationTypeFilter(loc.type)}
                                        alt=""
                                    />
                                </Marker>
                            );
                        })}
                </ReactMapGl>
            </div>
            {/* <AlertCard images={[]} /> */}
            {deptCard}
        </div>
    );
}
