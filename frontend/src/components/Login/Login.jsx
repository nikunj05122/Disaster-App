import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "firebase/messaging";

import "./Login.css";
import line from "./../../assets/icons/line.svg";
import map from "./../../assets/img/map.png";
import login_scree_logo from "./../../assets/img/login_scree_logo.png";
import { BASE_SERVER_URL } from "./../../config/constant";
import { messaging } from "./../../config/firebase";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // const navigate = useNavigate();

    const [number, setNumber] = useState();
    const [MPIN, setMPIN] = useState();
    const [loginData, setLoginData] = useState();
    const [token, setToken] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("click");
        setIsLoading(true);

        // console.log("vapidKey ", process.env.REACT_APP_WEB_MSG_CRED);
        getToken(messaging, {
            vapidKey: process.env.REACT_APP_WEB_MSG_CRED,
        })
            .then((currentToken) => {
                if (currentToken) {
                    // Send the token to your server and update the UI if necessary
                    setToken(currentToken);
                    console.log("token ", currentToken);
                    axios({
                        method: "post",
                        url: `${BASE_SERVER_URL}/users/login`,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: {
                            number: `+91${number}`,
                            MPIN: MPIN,
                            fcmToken: token,
                            isWeb: true,
                        },
                    })
                        .then((response) => {
                            setIsLoading(false);

                            if (response.status === 200) {
                                setLoginData(response.data);
                                console.log("response", response.data);
                                navigate("/");
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else {
                    // Show permission request UI
                    console.log(
                        "No registration token available. Request permission to generate one."
                    );
                }
            })
            .catch((err) => {
                console.log("An error occurred while retrieving token. ", err);
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
                    <div className="rAK">R A K S H A K</div>
                    <img
                        className="leftSide-img"
                        alt=""
                        src={login_scree_logo}
                    />
                    <div className="v11">v 1.1 - Team Dash</div>
                </div>
                <div className="rightSide">
                    <b className="login1">Login</b>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="tel"
                            className="phoneNumberChild"
                            id="phoneNumber"
                            name="phoneNumber"
                            pattern="[0-9]{10}"
                            maxLength="10"
                            minLength="10"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="Phone Number"
                            required
                        />

                        <input
                            type="password"
                            className="phoneNumberChild"
                            id="mpin"
                            name="mpin"
                            pattern="[0-9]{4}"
                            maxLength="4"
                            minLength="4"
                            value={MPIN}
                            onChange={(e) => setMPIN(e.target.value)}
                            placeholder="Enter the PIN"
                            required
                        />

                        <button
                            type="submit"
                            className="login2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="spinner"></div>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
