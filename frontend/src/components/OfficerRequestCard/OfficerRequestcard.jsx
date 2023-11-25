import React from "react";
import "./OfficerRequest.css"; // Make sure to create a CSS file with this name
import { Link } from "react-router-dom";
import login_scree_logo from "./../../assets/img/login_scree_logo.png";
import { BASE_SERVER_URL, COOKIE } from "./../../config/constant";

const OfficerRequestCard = ({ Officerdetails }) => {
    return (
        <div className="main-grid">
            <div className="officer-container">
                <div className="officer-image-container">
                    <img
                        src={login_scree_logo}
                        alt={Officerdetails.name}
                        className="officer-image"
                    />
                </div>
                <div className="officer-details">
                    <div className="officer-name officer-text">
                        <strong>Name:</strong>
                        {Officerdetails.name}
                    </div>
                    <div className="officer-text">
                        <strong>Address:</strong> {Officerdetails.address}
                    </div>
                    <div className="officer-text">
                        <strong>Department:</strong> {Officerdetails.Department}
                    </div>
                    <div className="officer-text">
                        <strong>Designation:</strong>{" "}
                        {Officerdetails.designation}
                    </div>
                    <div className="officer-text">
                        <strong>Number:</strong>{" "}
                        {Officerdetails.phoneNumbers
                            ? Officerdetails.phoneNumbers.join(" / ")
                            : "N/A"}
                    </div>
                </div>

                <div class="request-actions">
                    <button class="btn-accept">Accept</button>
                    <button class="btn-decline">Decline</button>
                </div>
            </div>
            <div className="officer-container">
                <div className="officer-image-container">
                    <img
                        src={login_scree_logo}
                        alt={Officerdetails.name}
                        className="officer-image"
                    />
                </div>
                <div className="officer-details">
                    <div className="officer-name officer-text">
                        <strong>Name:</strong>
                        {Officerdetails.name}
                    </div>
                    <div className="officer-text">
                        <strong>Address:</strong> {Officerdetails.address}
                    </div>
                    <div className="officer-text">
                        <strong>Department:</strong> {Officerdetails.Department}
                    </div>
                    <div className="officer-text">
                        <strong>Designation:</strong>{" "}
                        {Officerdetails.designation}
                    </div>
                    <div className="officer-text">
                        <strong>Number:</strong>{" "}
                        {Officerdetails.phoneNumbers
                            ? Officerdetails.phoneNumbers.join(" / ")
                            : "N/A"}
                    </div>
                </div>

                <div class="request-actions">
                    <button class="btn-accept">Accept</button>
                    <button class="btn-decline">Decline</button>
                </div>
            </div>
        </div>
    );
};

export default OfficerRequestCard;
