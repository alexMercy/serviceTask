import {Button, Card} from "antd";
import {useNavigate} from "react-router-dom";
import {setAuth} from "../utils/auth.ts";


export function AuthPage() {
    const navigate = useNavigate()

    const onClick = () => {
        setAuth(true);
        navigate('/');
    }
    return (
            <Card className="w-full h-full"
                  bodyStyle={{height:'85%'}}
            >
                <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                    <span className="block text-3xl">Authentication Page</span>
                    <Button onClick={onClick}>Log in</Button>
                </div>
            </Card>
    );
}