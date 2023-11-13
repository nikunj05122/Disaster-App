import React from "react";
import { Outlet } from "react-router-dom";
import Search from "./Search/Search";

function Layout() {
    return (
        <>
            <Search />
            <Outlet />
        </>
    );
}

export default Layout;
