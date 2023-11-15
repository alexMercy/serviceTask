import {Breadcrumb, Button, Card, Menu, MenuProps, Skeleton} from "antd";
import {useNavigate} from "react-router-dom";
import {flatData, indexedData} from "../utils/data-transform.ts";
import {useState} from "react";



export function BrowserPage() {
    const navigate = useNavigate();
    const [path, setPath] = useState([]);

    const items: MenuProps['items'] = [
        {label:'Navigation One', key:'sub1'},
        {label:'Navigation 2', key:'sub2'},
        {label:'Navigation 3', key:'sub3'},
    ];

    console.log(flatData);
    console.log(indexedData);

    return (
        <div className="grid grid-cols-4 h-full" style={{gap: 40}}>
            <Card className="h-full" title={<Button onClick={()=>navigate('../')}>back</Button>}>
                {!items
                    ? <div className="flex gap-2 flex-col">
                        <Skeleton.Button active block />
                        <Skeleton.Button active block />
                        <Skeleton.Button active block />
                        <Skeleton.Button active block />
                    </div>
                    : <Menu
                        className="w-full"
                        style={{borderInlineEnd: 0}}
                        mode="inline"
                        items={items}
                    />}
            </Card>

            <Card className="col-span-3 h-full"
                  title={<Breadcrumb items={path}/> }
            >
                Main browser
            </Card>
        </div>

    );
}