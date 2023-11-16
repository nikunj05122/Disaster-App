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

                 <form action="abc.php" method="post">
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
                        <button type="submit" className="login2 loginButtonChild loginButton">Login</button>
                    </div>
                 </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
