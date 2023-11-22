/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onMessage } from "firebase/messaging";
import { useCookies } from "react-cookie";

import { messaging } from "./../config/firebase";
import Header from "./Header/Header";
import { COOKIE } from "./../config/constant";

function Layout() {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(COOKIE);
    async function requestPermission() {
        const permissions = await Notification.requestPermission();
        if (permissions === "granted") {
            // alert("Ypu accespt for notifiaction");
            onMessage(messaging, (payload) => {
                console.log("Message received. ", payload);
                console.log(cookies);
                cookies.operation
                    ? setCookie(
                          "operation",
                          [...cookies.operation, payload.data.operationId],
                          {
                              path: "/",
                          }
                      )
                    : setCookie("operation", [payload.data.operationId], {
                          path: "/",
                      });
                // navigate(`?operationId=${payload.data.operationId}`);
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
