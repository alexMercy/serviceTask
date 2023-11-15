import {Button} from "antd";
import {useNavigate} from "react-router-dom";


export function ServiceInfoPage() {
    const navigate = useNavigate()
    return (
        <Button onClick={()=>navigate('../')}>back</Button>
    );
}