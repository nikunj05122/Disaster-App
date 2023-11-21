import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import "./Setting.css";
import map from "./../../assets/img/map.png";
import { BASE_SERVER_URL } from "./../../config/constant";

function Setting() {
    const [cookies] = useCookies(["jwt"]);

    const dummyData = {
        name: "-",
        number: "-",
        designation: "-",
    };

    const [userData, setUserData] = useState(dummyData);
    const [deptData, setDeptData] = useState({
        name: "-",
        address: "-",
        number: ["-"],
        vehicles: [{ name: "-", count: 0 }],
        state: "-",
        city: "-",
        totalVehicles: 0,
    });
    const [editingField, setEditingField] = useState(null);
    const [editValue, setEditValue] = useState("");

    useEffect(() => {
        axios({
            method: "get",
            url: `${BASE_SERVER_URL}/users/me`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.jwt}`,
            },
        })
            .then((response) => {
                console.log("responce ", response);
                setUserData(response.data.data.user);
                setDeptData(response.data.data.department);
            })
            .catch((error) => {
                console.error(error);
            });
        setUserData(dummyData);
    }, []);

    const handleEditStart = (field) => {
        setEditingField(field);
        setEditValue(userData[field]);
    };

    const handleEditCancel = () => {
        setEditingField(null);
        setEditValue("");
    };

    const handleEditSave = async () => {
        setUserData((prevData) => ({ ...prevData, [editingField]: editValue }));
        try {
            const response = await axios({
                method: "patch",
                url: `${BASE_SERVER_URL}/users/updateMe`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${cookies.jwt}`,
                },
                data: {
                    [editingField]: editValue,
                },
            });

            setUserData(response.data.data.user);
            setEditingField(null);
            setEditValue("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="setting">
            <div className="card">
                <h2>User Details</h2>
                <div className="detail">
                    <div className="label">
                        <h4>Name</h4>
                    </div>
                    <div className="info">
                        {editingField === "name" ? (
                            <input
                                className="input"
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                            />
                        ) : (
                            <p>{userData.name}</p>
                        )}
                        {editingField === "name" ? (
                            <>
                                <button
                                    className="button"
                                    onClick={handleEditSave}
                                >
                                    Save
                                </button>
                                <button
                                    className="button"
                                    onClick={handleEditCancel}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                className="button"
                                onClick={() => handleEditStart("name")}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
                <hr className="line" />
                <div className="detail">
                    <div className="label">
                        <h4>Number</h4>
                    </div>
                    <div className="info">
                        {editingField === "number" ? (
                            <input
                                className="input"
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                            />
                        ) : (
                            <p>{userData.number}</p>
                        )}
                        {editingField === "number" ? (
                            <>
                                <button
                                    className="button"
                                    onClick={handleEditSave}
                                >
                                    Save
                                </button>
                                <button
                                    className="button"
                                    onClick={handleEditCancel}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                className="button"
                                onClick={() => handleEditStart("number")}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
                <hr className="line" />
                <div className="detail">
                    <div className="label">
                        <h4>Designation</h4>
                    </div>
                    <div className="info">
                        <p>
                            {userData.designation.replace(
                                /([a-z])([A-Z])/g,
                                "$1 $2"
                            )}
                        </p>
                    </div>
                </div>
                <hr className="line" />
                <h2 style={{ margin: "24px 0px 0px 0px" }}>
                    Department Details
                </h2>
                <div className="detail">
                    <div className="label">
                        <h4>Name</h4>
                    </div>
                    <div className="info">
                        <p>{deptData.name}</p>
                    </div>
                </div>
                <hr className="line" />
                <div className="detail">
                    <div className="label">
                        <h4>Address</h4>
                    </div>
                    <div className="info">
                        <p>{deptData.address}</p>
                    </div>
                </div>
                <hr className="line" />
                <div className="detail">
                    <div className="label">
                        <h4>Number</h4>
                    </div>
                    <div className="info">
                        <p>{deptData.number.join(" | ")}</p>
                    </div>
                </div>
                <hr className="line" />
                <div className="detail">
                    <div className="label">
                        <h4>City</h4>
                    </div>
                    <div className="info">
                        <p>{deptData.city}</p>
                    </div>
                </div>
                <hr className="line" />
                <div className="detail">
                    <div className="label">
                        <h4>State</h4>
                    </div>
                    <div className="info">
                        <p>{deptData.state}</p>
                    </div>
                </div>
                <hr className="line" />
            </div>
            <div className="backGround">
                <img className="image2Icon" alt="" src={map} />
                <div className="backGroundChild" />
            </div>
        </div>
    );
}

export default Setting;
