import { Outlet, useLocation, useNavigate} from "react-router-dom";
import {Button} from "antd";
import {useEffect, useState} from "react";
import {isAuthentication, setAuth} from "../utils/auth.ts";


export function Layout() {
    const headerHeight = 60;
    const outletMargin = 40;

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
        <>
            <header className="w-full px-4 bg-white flex justify-between items-center rounded-xl" style={{height: headerHeight}}>
                <div className="flex gap-2">
                    {/*()=>navigate("/") думаю может быть лучше с точки зрения табуляции, чем заворачивать в Navigate*/}
                    <Button onClick={()=>navigate("/")}>main</Button>
                    {isAuth && <Button onClick={()=>navigate("/browse")}>browse</Button>}
                </div>

                {!isAuth
                    ? <Button onClick={()=>navigate("/login")}>login</Button>
                    : <Button onClick={onLogout}>logout</Button> }
            </header>
            <div style={{height: `calc(100% - ${headerHeight}px - ${outletMargin}px)`, marginTop: outletMargin}}>
                <Outlet />
            </div>
        </>
    );
}