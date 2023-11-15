import styles from "./Login.css";
import line from "./../../assets/icons/line.svg";
import map from "./../../assets/img/map.png";
import login_scree_logo from "./../../assets/img/login_scree_logo.png";

const Login = () => {
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
                    <img
                        className="ab131D9f643638a05C8bd6056eIcon"
                        alt=""
                        src={login_scree_logo}
                    />
                    <b className="rAK">R A K S H A K</b>
                    <div className="v11">v 1.1 - Team Dash</div>
                </div>
                <div className="rightSide">
                    <b className="login1">Login</b>
                    <div className="phoneNumber">
                        <div className="phoneNumberChild" />
                        <div className="enterThePin">Phone Number</div>
                    </div>
                    <div className="mpin">
                        <div className="phoneNumberChild" />
                        <div className="enterThePin">Enter the PIN</div>
                    </div>
                    <div className="loginButton">
                        <div className="loginButtonChild" />
                        <div className="login2">Login</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
