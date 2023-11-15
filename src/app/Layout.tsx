import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {Button} from "antd";
import {isAuthentication, setAuth} from "../utils/utils.ts";
import {useEffect, useState} from "react";


export function Layout() {
    const [isAuth, setIsAuth] = useState(isAuthentication());
    const {pathname} = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        setIsAuth(isAuthentication());
    },[pathname])

    const onLogout = () => {
        setAuth(false);
        pathname === '/'
            ? location.reload()
            : navigate("/")
    }

    return (
        <div>
            <header>
                {/*Лучше с точки зрения табуляции, чем заворачивать в Navigate*/}
                <Button onClick={()=>navigate("/")}>main</Button>
                {!isAuth
                    ? <Button onClick={()=>navigate("/login")}>login</Button>
                    : <Button onClick={onLogout}>logout</Button> }
                {isAuth && <Button onClick={()=>navigate("/browse")}>browse</Button>}
            </header>
            <Outlet />
        </div>
    );
}