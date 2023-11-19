import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { onMessage } from "firebase/messaging";
import { messaging } from "./../config/firebase";

function Layout() {
    async function requestPermission() {
        const permissions = await Notification.requestPermission();
        if (permissions === "granted") {
            // alert("Ypu accespt for notifiaction");
            onMessage(messaging, (payload) => {
                console.log("Message received. ", payload);
            });
        } else if (permissions === "denied") {
            alert("Ypu denied for notifiaction");
        }
    }

    useEffect(() => {
        requestPermission();
    }, []);
    return (
        <>
            <Outlet />
        </>
    );
}

export default Layout;
