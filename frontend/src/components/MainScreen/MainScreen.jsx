/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGl, {
    Marker,
    GeolocateControl,
    NavigationControl,
} from "react-map-gl";
import axios from "axios";
import { useCookies } from "react-cookie";

import "./Mainscreen.css";
import List from "./List";
import RedAlert from "./RedAlert";
import DeptCard from "./DeptCard";
import { BASE_SERVER_URL, COOKIE } from "./../../config/constant";
import { locationTypeFilter } from "./../../utils/locationTypeFilter";
import search from "./../../assets/icons/search.svg";

const Map_Box_Token = process.env.REACT_APP_MAP_BOX_TOKEN;

export default function MainScreen() {
    const [cookies] = useCookies(COOKIE);

    const [mapData, setMapData] = useState(null);
    const [searchData, setSearchData] = useState();
    const [featureCollections, setFeatureCollections] = useState();
    const [deptCard, setDeptCard] = useState(null);
    // console.log("featureCollections : ", featureCollections);

    const [inputText, setInputText] = useState("");
    const [viewPort, setViewPort] = useState({
        latitude: 21.22240895512974,
        longitude: 72.8838665679645,
        zoom: 11,
    });

    console.log("searchParams", cookies.operation);

    const inputHandler = (e) => {
        //convert input text to lower case
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

    useEffect(() => {
        // axios({
        //     method: "get",
        //     url: `${BASE_SERVER_URL}/operation/${"id"}`,
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${cookies.jwt}`,
        //     },
        // })
        //     .then((response) => {
        //         console.error(response);
        //         if (response.status === 200) {
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }, [cookies.operation, cookies?.operation?.length]);

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
                    {mapData &&
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
                                        src={locationTypeFilter(loc.type)}
                                        alt=""
                                    />
                                </Marker>
                            );
                        })}
                </ReactMapGl>
            </div>

            {deptCard}
        </div>
    );
}
