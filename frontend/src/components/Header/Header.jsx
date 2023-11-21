/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

import "./Header.css";
import map from "./../../assets/icons/map.svg";
import userRequest from "./../../assets/icons/user-request.svg";
import alertArea from "./../../assets/icons/alert-area.svg";
import setting from "./../../assets/icons/setting.svg";
import { ReactComponent as Toggle } from "./../../assets/icons/toggle.svg";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [cookies] = useCookies(["jwt"]);
    const [loc] = useState(location.pathname);
    const [isNavbarVisible, setIsNavbarVisible] = useState("none");

    useEffect(() => {
        if (!cookies.jwt) {
            navigate("/login");
        }
    }, [loc, cookies.jwt]);

    const nevigation = (nav) => {
        navigate(nav);
    };

    const toggleNavbar = () => {
        if (isNavbarVisible === "none") setIsNavbarVisible("block");
        else setIsNavbarVisible("none");
    };
    return (
        <div className="header-container">
            <button id="toggleBtn" onClick={toggleNavbar}>
                <Toggle />
            </button>
            <div className={`navbar-item`} style={{ display: isNavbarVisible }}>
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

                <div
                    className="header-item"
                    onClick={() => nevigation("/setting")}
                >
                    <img src={setting} alt="Setting Icon" />
                    <h5>Setting</h5>
                </div>
            </div>
        </div>
    );
}

export default Header;
