import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {isAuthentication} from "./utils/utils.ts";

export function ProtectedRoutes() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuth = isAuthentication();

    useEffect(()=> {

        if(isAuth && location.pathname === "/login") navigate("/");
        if(!isAuth && !["/", "/login"].includes(location.pathname)) navigate("/login")

    }, [location.pathname, isAuth, navigate])


    return (
        <Outlet />
    );
}