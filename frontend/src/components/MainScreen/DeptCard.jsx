import React, { useEffect, useState } from "react";
import axios from "axios";

import { BASE_SERVER_URL } from "./../../config/constant";
import noImage from "./../../assets/icons/noImage.svg";
import cancel from "./../../assets/icons/cancel.svg";

const DeptCard = (props) => {
    const [locationDetails, setLocationDetails] = useState(null);

    useEffect(() => {
        axios
            .get(
                `${BASE_SERVER_URL}/organization/${props.organizationId}?officerDetailsIncludes=true`
            )
            .then((response) => {
                // const department = [
                //     ...response.data.data.department.map(
                //         (data) => data.departments
                //     ),
                // ];
                // setMapData(department.flat());
                setLocationDetails(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [props.organizationId]);

    const onClickMarker = (loc) => {
        setLocationDetails(loc);
    };

    return (
        <>
            {locationDetails ? (
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
                            <div className="dept-value dept-address">
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
                                {locationDetails.number.join(" | ")}
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
            ) : null}
        </>
    );
};

export default DeptCard;
