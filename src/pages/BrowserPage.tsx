import {Breadcrumb, Button, Card, Menu, MenuProps, Skeleton} from "antd";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getFileNode} from "../utils/fetches.ts";
import {ItemType} from "antd/es/menu/hooks/useItems";
import {FileOutlined, FolderOutlined} from "@ant-design/icons";



export function BrowserPage() {
    const navigate = useNavigate();
    const [path, setPath] = useState([]);
    const [parentItems, setParentItems] = useState([] as MenuProps['items']);
    const [childItems, setchildItems] = useState([]);


    useEffect(()=>{
        getFileNode().then(({data}) => {
            setParentItems(data.childs.map(({isDir, key, name}): ItemType =>
                isDir
                    ? {key, label: name, icon: <FolderOutlined />}
                    : {key, label: name, icon: <FileOutlined />}
            ))
        })
    },[]);


    return (
        <div className="grid grid-cols-4 h-full" style={{gap: 40}}>
            <Card className="h-full" title={<Button onClick={()=>navigate('../')}>back</Button>}>
                {!parentItems?.length
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
                        items={parentItems}
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