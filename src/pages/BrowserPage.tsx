import {Breadcrumb, Button, Card, message, Skeleton, Table} from "antd";
import {useEffect, useState} from "react";
import {getFileNode, getSiblings, search} from "../utils/fetches.ts";
import {DataType, FlatData} from "../utils/types.ts";
import {convertToMenuItems, convertToSideMenuItems} from "../utils/menu-items-converters.tsx";
import {BreadcrumbItemType} from "antd/es/breadcrumb/Breadcrumb";
import { ColumnType} from "antd/es/table";
import Search from "antd/es/input/Search";
import {createBreadcrumbs} from "../utils/create-breadcrumbs.ts";
import "./BrowserPageStyle.css";


export function BrowserPage() {
    const [messageApi, contextHolder] = message.useMessage();

    const [path, setPath] = useState([] as (BreadcrumbItemType & {id: string})[]);
    const [parentItems, setParentItems] = useState([] as FlatData[]);
    const [childItems, setChildItems] = useState([] as FlatData[]);

    const [isSideMenuLoad, setIsSideMenuLoad] = useState(false);
    const [isMenuLoad, setIsMenuLoad] = useState(false);
    const [isSearch, setIsSearch] = useState(false)

    const column: ColumnType<DataType> = {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter:(a: DataType, b: DataType) => {
                return a.name.localeCompare(b.name)
            },
        }

    const sideMenuColumns = [{
            ...column,
            render: (text: string, data: DataType) =>
                <div className="w-full h-full cursor-default px-4 flex items-center gap-4"
                     onClick={()=>onSideMenuClick(data)}>
                    {data.icon} {text}
                </div>
        }]

    const menuColumns = [{
        ...column,
        render: (text: string, data: DataType) =>
            <div className="w-full h-full cursor-default px-4 flex items-center gap-4"
                 onClick={()=>onMenuClick(data)}>
                {data.icon} {text}
            </div>
    }]


    useEffect(()=>{
        setIsSideMenuLoad(true);
        getFileNode().then(({data}) => {
            setParentItems([data.parent]);
            setIsSideMenuLoad(false);
        })
    },[]);

    const onSideMenuClick = ({key, name}: DataType) => {
        setIsMenuLoad(true);

        getFileNode(key).then(({data}) => {
            setChildItems(data.childs)
            setIsMenuLoad(false);
            setPath((prevState) => {
                prevState.pop();
                return [...prevState, {title: name, key} as BreadcrumbItemType & { id: string }]
            })
        })
    }

    const onMenuClick = ({key, name}: DataType) => {
        const item = childItems.find(item => item.key === key)!;
        if (!item.isDir) return;
        setParentItems(childItems);
        setIsMenuLoad(true);
        getFileNode(key).then(({data}) => {
            setChildItems(data.childs)
            setIsMenuLoad(false);
            setPath((prevState) => [...prevState, {title: name, id: key} as BreadcrumbItemType & {id: string}])
        })
    }

    const onBackClick = () => {
        setChildItems(parentItems);
        setIsSideMenuLoad(true);
        const parentKey = path && path[path.length-3]
            ? path[path.length-3].id : '';
        getFileNode(parentKey).then(({data}) => {
            let arg: FlatData[]
            switch (parentKey) {
                case "":
                    arg = path.length ? [data.parent] : [];
                    break;
                default:
                    arg = data.childs;
            }
            setParentItems(arg)
            setIsSideMenuLoad(false);
        })
        setPath((prevState) => {
            prevState.pop();
            return prevState;
        })
    }

    function onSearch(text: string) {
        if(!text) return;
        setIsSearch(true)
        search(text).then(({data}) => {
            setIsSearch(false)
            if(!data) return messageApi.error("Entity not found.");

            setIsMenuLoad(true);
            setIsSideMenuLoad(true);

            getSiblings(data.key).then(({data: siblings}) => {
                setChildItems(siblings.siblings);
                setIsMenuLoad(false);
                setPath(createBreadcrumbs(siblings.parent));

                getSiblings(siblings.parent.key).then(({data: siblings}) => {
                    setParentItems(siblings.siblings);
                    setIsSideMenuLoad(false);
                })

            })
        })
    }

    return (
        <>
            <div className="grid grid-cols-4 h-full browse" style={{gap: 40}}>
                <Card className="h-full"
                      title={<Button disabled={!path.length} onClick={onBackClick}>back</Button>}
                      extra={<Search loading={isSearch} placeholder="Search..." onSearch={onSearch} />}>
                    {isSideMenuLoad
                        ? <div className="flex gap-2 flex-col">
                            {[1,2,3,4].map((v)=> <Skeleton.Button key={v} active block />)}
                        </div>
                        : <Table columns={sideMenuColumns}
                                 dataSource={convertToSideMenuItems(parentItems)}
                                 className="h-full"
                                 pagination={false}/>

                    }
                </Card>

                <Card className="col-span-3 h-full"
                      title={<Breadcrumb items={path}/> }
                >
                    {isMenuLoad
                        ? <div className="flex gap-2 flex-col">
                            {[1,2,3,4].map((v)=> <Skeleton.Button key={v} active block />)}
                        </div>
                        : <Table columns={menuColumns}
                                 dataSource={convertToMenuItems(childItems)}
                                 className="h-full"
                                 pagination={false}/>
                    }
                </Card>
            </div>
            {contextHolder}
        </>);
}