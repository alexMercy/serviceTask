import {Button, Card, Menu, MenuProps, Skeleton} from "antd";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";


type MenuItem = Required<MenuProps>['items'][number];

export function ServiceInfoPage() {
    const navigate = useNavigate();
    const [rItems, setR] = useState(null)


    function getItem({label, key, icon, children, type}: {
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    }): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }

    const items: MenuProps['items'] = [
        getItem({label:'Navigation One', key:'sub1'}),
        getItem({label:'Navigation 2', key:'sub2'}),
        getItem({label:'Navigation 3', key:'sub3'}),
    ];

    const getItems = () => {
        new Promise(resolve => {
            setTimeout(() => {
                resolve(items)
            }, 1000)
        }).then((r: any)  => setR(r))

    }
    getItems();
    return (
        <div className="grid grid-cols-4 h-full" style={{gap: 40}}>
            <Card className="h-full" title={<Button onClick={()=>navigate('../')}>back</Button>}>
                {!rItems
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
                    items={rItems}
                />}
            </Card>

            <Card className="col-span-3 h-full" >
                Main browser
            </Card>
        </div>

    );
}