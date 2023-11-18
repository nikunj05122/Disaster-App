import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import React, { useState } from 'react';
import line from "./../../assets/icons/line.svg";
import map from "./../../assets/img/map.png";
import { useNavigate } from 'react-router-dom';
import login_scree_logo from "./../../assets/img/login_scree_logo.png";
import { BASE_SERVER_URL } from "./../../config/constant";

const Login = () => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);

          // Simulate a login process for DEMO
        setTimeout(() => {
            setIsLoading(false);
            navigate('/next-page'); // Replace '/next-page' with your actual route
        }, 3000); // Simulating a network request delay
    };

    const navigate = useNavigate();

    const [number, setNumber] = useState();
    const [MPIN, setMPIN] = useState();
    const [loginData, setLoginData] = useState();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: "post",
            url: `${BASE_SERVER_URL}/users/login`,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                number: `+91${number}`,
                MPIN: MPIN,
            },
        })
            .then((response) => {
                console.log("response", response);
                if (response.status === 200) {
                    setLoginData(response.data);
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="login">
            <div className="backGround">
                <img className="image2Icon" alt="" src={map} />
                <div className="backGroundChild" />
            </div>
            <div className="loginPart">
                <div className="loginPartChild" />
                <img className="loginPartItem" alt="" src={line} />
                <div className="leftSide">
                    <div className="imgcontainer">
                    <img
                        className="ab131D9f643638a05C8bd6056eIcon"
                        alt=""
                        src={login_scree_logo}
                    />
                    </div>
                    <b className="rAK">R A K S H A K</b>
                    <div className="v11">v 1.1 - Team Dash</div>
                </div>
                <div className="rightSide">
                    <b className="login1">Login</b>


                 <form onSubmit={handleLogin}>
                    <div className="phoneNumber">
                        {/* <div className="phoneNumberChild" /> */}
                        <input type="tel" className="phoneNumberChild" id="phoneNumber" name="phoneNumber" pattern="[0-9]{10}" placeholder="Phone Number" required/>
                        {/* <div className="enterThePin">Phone Number</div> */}
                       
                    </div>

                    <div className="mpin">
                        {/* <div className="phoneNumberChild" /> */}
                        <input type="text" className="phoneNumberChild" id="mpin" name="mpin" pattern="[0-9]{4}" placeholder="Enter the PIN" required />
                        {/* <div className="enterThePin">Enter the PIN</div> */}
                    </div>
                    <div className="loginButton">
                        {/* <div className="loginButtonChild" /> */}
                        <button type="submit" className="login2 loginButtonChild loginButton" disabled={isLoading}>
                        {isLoading ? <div className="spinner"></div> : 'Login'}
                        </button>
                    </div>
                 </form>
                </div>
            </div>
        </div>
    );
    };

export default Login;
