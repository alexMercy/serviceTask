import {Button} from "antd";
import {setAuth} from "../utils/utils.ts";
import {useNavigate} from "react-router-dom";


export function AuthPage() {
    const navigate = useNavigate()

    const onClick = () => {
        setAuth(true);
        navigate('/');
    }
    return (
        <div>
            <header>
                AUTH
            </header>
            <Button onClick={onClick}>Войти</Button>
        </div>
    );
};