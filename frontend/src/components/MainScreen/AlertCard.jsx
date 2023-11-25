import React, { useState } from "react";
import "./AlertCard.css";
import menu from "./../../assets/icons/demo/menu.svg";
import cam from "./../../assets/icons/demo/cam.svg";
import close from "./../../assets/icons/demo/close.svg";
import map from "./../../assets/icons/demo/map.svg";
import map2 from "./../../assets/icons/demo/map2.svg";
import img1 from "./../../assets/icons/demo/img1.svg";
import img2 from "./../../assets/icons/demo/img2.svg";
import img3 from "./../../assets/icons/demo/img3.svg";
import img4 from "./../../assets/icons/demo/img4.svg";

const AlertCard = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const moveHorizontally = (direction) => {
        if (images && images.length > 0) {
            const nextImage =
                direction === "next" ? currentImage + 1 : currentImage - 1;
            const lastIndex = images.length - 1;

            if (nextImage >= 0 && nextImage <= lastIndex) {
                setCurrentImage(nextImage);
            }
        }
    };

    // Dummy user data
    const userData = {
        name: "John Doe",
        number: "1234567890",
        description: "nothing",
    };

    return (
        <div className="card-container">
            <div className="card">
                <div className="app-container">
                    <div className="menu-section">
                        <img src={menu} alt="Menu" className="menu-image" />

                        <button className="close-button">
                            <img
                                src={close}
                                alt="Menu"
                                className="close-image"
                            />
                        </button>
                    </div>

                    <div className="details">
                        <div className="horizontal-line"></div>
                    </div>

                    <div>
                        <div className="main-container">
                            <div className="reporter-details">
                                <div className=" name report-details">
                                    <h4>Name:</h4>&nbsp;
                                    <p>{userData.name}</p>
                                </div>

                                <div className="number report-details">
                                    <h4>Number:</h4>&nbsp;
                                    <p>{userData.number}</p>
                                </div>

                                <div className="number report-details">
                                    <h4>Description:</h4>&nbsp;
                                    <p>{userData.description}</p>
                                </div>
                            </div>
                            <div className="buttons">
                                <div className="req-image">
                                    <button className="merge-button">
                                        <img
                                            src={map}
                                            alt="Menu"
                                            className="close-image"
                                        />
                                    </button>
                                </div>

                                <div className="req-image">
                                    <button className="merge2-button">
                                        <img
                                            src={map2}
                                            alt="Menu"
                                            className="close-image"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="image">
                            <img src={cam} alt="Menu" className="cam-image" />
                            <div className="horizontal-line"></div>
                        </div>
                    </div>

                    <div className="box">
                        <div className="row-img">
                            <div>
                                <img
                                    src={img1}
                                    alt="Menu"
                                    className="fire-image"
                                />
                            </div>

                            <div>
                                <img
                                    src={img2}
                                    alt="Menu"
                                    className="=fire-image"
                                />
                            </div>

                            <div>
                                <img
                                    src={img3}
                                    alt="Menu"
                                    className="fire-image"
                                />
                            </div>

                            <div>
                                <img
                                    src={img4}
                                    alt="Menu"
                                    className="fire-image"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="horizontal-images-container">
                        {images && images.length > 0 && (
                            <>
                                <img
                                    src={images[currentImage]}
                                    alt="Horizontal"
                                    className="horizontal-image"
                                />
                                <button
                                    onClick={() => moveHorizontally("prev")}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => moveHorizontally("next")}
                                >
                                    Next
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertCard;
