/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onMessage } from "firebase/messaging";

import { messaging } from "./../config/firebase";
import Header from "./Header/Header";

function Layout() {
    const navigate = useNavigate();
    async function requestPermission() {
        const permissions = await Notification.requestPermission();
        if (permissions === "granted") {
            // alert("Ypu accespt for notifiaction");
            onMessage(messaging, (payload) => {
                console.log("Message received. ", payload);
                navigate(`/:operationId=${payload.data.reportId}`);
            });
        } else if (permissions === "denied") {
            alert("Ypu denied for notifiaction");
        }
    }

    useEffect(() => {
        requestPermission();
    }, []);
    return (
        <div className="layout">
            <Header />
            <Outlet />
        </div>
    );
}

export default Layout;
