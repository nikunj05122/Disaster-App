/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

import "./Header.css";
import { ReactComponent as Map } from "./../../assets/icons/map.svg";
import { ReactComponent as UserRequest } from "./../../assets/icons/user-request.svg";
import { ReactComponent as AlertArea } from "./../../assets/icons/alert-area.svg";
import { ReactComponent as Setting } from "./../../assets/icons/setting.svg";
import { ReactComponent as Toggle } from "./../../assets/icons/toggle.svg";
import { COOKIE } from "./../../config/constant";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [cookies] = useCookies(COOKIE);
    const [loc] = useState(location.pathname);
    const [isNavbarVisible, setIsNavbarVisible] = useState({
        opacity: 0,
        visibility: "hidden",
        transition: "opacity 0.3s ease, visibility 0s linear 0.3s",
    });
    const [navbarHeight, setNavbarHeight] = useState({
        height: "55px",
    });

    useEffect(() => {
        if (!cookies.jwt) {
            navigate("/login");
        }
    }, [loc, cookies.jwt]);

    const toggleNavbar = () => {
        if (isNavbarVisible.visibility === "hidden") {
            setIsNavbarVisible({
                opacity: 1,
                visibility: "visible",
                transition: "opacity 0.3s ease",
            });
            setNavbarHeight({
                height: "auto",
            });
        } else {
            setNavbarHeight({
                height: "55px",
            });
            setIsNavbarVisible({
                opacity: 0,
                visibility: "hidden",
                transition: "opacity 0.3s ease, visibility 0s linear 0.3s",
            });
        }
    };
    return (
        <div className="header-container" style={navbarHeight}>
            <button id="toggleBtn" onClick={toggleNavbar}>
                <Toggle />
            </button>
            <div className={`navbar-item`} style={isNavbarVisible}>
                <div className="horizontal-line"></div>

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        ` ${isActive ? "Active" : "notActive"}`
                    }
                >
                    <div className="header-item">
                        <Map />
                        <h5>Map</h5>
                    </div>
                </NavLink>
                <div className="horizontal-line"></div>
                <NavLink
                    to="/officer-requests-card"
                    className={({ isActive }) =>
                        ` ${isActive ? "Active" : "notActive"}`
                    }
                >
                    <div className="header-item">
                        <UserRequest />
                        <h5>Request</h5>
                    </div>
                </NavLink>

                <div className="horizontal-line"></div>

                <NavLink
                    to="/create-red-alert-area"
                    className={({ isActive }) =>
                        ` ${isActive ? "Active" : "notActive"}`
                    }
                >
                    <div className="header-item">
                        <AlertArea />
                        <h5>Alert Area</h5>
                    </div>
                </NavLink>
                <div className="horizontal-line"></div>
                <NavLink
                    to="/setting"
                    className={({ isActive }) =>
                        ` ${isActive ? "Active" : "notActive"}`
                    }
                >
                    <div className="header-item">
                        <Setting />
                        <h5>Setting</h5>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

export default Header;
