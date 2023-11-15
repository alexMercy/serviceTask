import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {setAuth} from "../utils/auth.ts";


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
            <Button onClick={onClick}>Log in</Button>
        </div>
    );
}