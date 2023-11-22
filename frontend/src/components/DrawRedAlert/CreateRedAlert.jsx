/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ReactMapGl, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import cancel from "./../../assets/icons/cancel.svg";

const Map_Box_Token = process.env.REACT_APP_MAP_BOX_TOKEN;

export default function CreateRedAlert(props) {
    const newViewPort = {
        latitude: props.viewPort.latitude,
        longitude: props.viewPort.longitude,
        zoom: props.viewPort.zoom - 1.75,
    };
    const [viewPort, setViewPort] = useState(newViewPort);

    const [submitBtn, setSubmitBtn] = props.submitBtnUseState;
    const [redAlertComponet, setRedAlertComponet] =
        props.setRedAlertComponetUseState;
    const [name, setName] = props.nameUseState;

    return (
        <div className="alert-form">
            <h2 className="heading">Create Red Alert</h2>
            <input
                type="text"
                name="name"
                id="name"
                className="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the name of Alert zone"
            />
            <div className="alert-map">
                <ReactMapGl
                    {...viewPort}
                    mapboxAccessToken={Map_Box_Token}
                    width="100px"
                    height="100px"
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    onMove={(evt) => setViewPort(evt.viewState)}
                >
                    <Source
                        key="alert-create-map"
                        id="alert-area"
                        type="geojson"
                        data={props.location}
                    >
                        <Layer
                            id="point"
                            type="circle"
                            paint={{
                                "circle-radius": 0,
                                "circle-color": "#ed5338",
                            }}
                        />
                        <Layer
                            id="line"
                            type="line"
                            paint={{
                                "line-width": 2,
                                "line-color": "#ed5338",
                            }}
                        />
                        <Layer
                            id="polygon"
                            type="fill"
                            paint={{
                                "fill-color": "#ed5338",
                                "fill-opacity": 0.4,
                            }}
                        />
                    </Source>
                </ReactMapGl>
            </div>
            <div
                className="dept-card-remove"
                onClick={() => {
                    setSubmitBtn("Create");
                    setRedAlertComponet(null);
                }}
            >
                <img src={cancel} alt="" />
            </div>
        </div>
    );
}
