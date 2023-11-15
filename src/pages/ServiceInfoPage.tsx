import {Button, Card} from "antd";
import {useNavigate} from "react-router-dom";


export function ServiceInfoPage() {
    const navigate = useNavigate()
    return (
        <div className="grid grid-cols-4 h-full" style={{gap: 40}}>
            <Card className="h-full" title={<Button onClick={()=>navigate('../')}>back</Button>}>
                Buttons here
            </Card>

            <Card className="col-span-3 h-full" >
                Main browser
            </Card>
        </div>

    );
}