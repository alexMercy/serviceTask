import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {isAuthentication} from "./utils/utils.ts";

export function ProtectedRoutes() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuth = isAuthentication();
    console.log(location);

    useEffect(()=> {

        if(isAuth && location.pathname === "/login") navigate("/");
        if(!isAuth && !["/", "/login"].includes(location.pathname)) navigate("/login")

    }, [location.pathname])


    return (
        <Outlet />
    );
}