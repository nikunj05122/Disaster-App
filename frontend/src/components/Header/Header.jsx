import React from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";
import map from "./../../assets/icons/map.svg";
import userRequest from "./../../assets/icons/user-request.svg";
import alertArea from "./../../assets/icons/alert-area.svg";
import setting from "./../../assets/icons/setting.svg";

function Header() {
    const navigate = useNavigate();

    const nevigation = (nav) => {
        console.log("Click", nav);
        navigate(nav);
    };
    return (
        <div className="header-container">
            <div className="header-item" onClick={() => nevigation("/")}>
                <img src={map} alt="Map Icon" />
                <h5>Map</h5>
            </div>
            <div className="horizontal-line"></div>
            <div className="header-item" onClick={() => nevigation("/")}>
                <img src={userRequest} alt="Request Icon" />
                <h5>Request</h5>
            </div>
            <div className="horizontal-line"></div>

            <div
                className="header-item"
                onClick={() => nevigation("/create-red-alert-area")}
            >
                <img src={alertArea} alt="Alert Icon" />
                <h5>Alert Area</h5>
            </div>
            <div className="horizontal-line"></div>

            <div className="header-item" onClick={() => nevigation("/")}>
                <img src={setting} alt="Setting Icon" />
                <h5>Setting</h5>
            </div>
        </div>
    );
}

export default Header;
