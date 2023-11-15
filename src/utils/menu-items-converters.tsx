import {DataType, FlatData} from "./types.ts";
import {FileOutlined, FolderOutlined} from "@ant-design/icons";

export const convertToMenuItems = (items: FlatData[]) =>
    items.map(({isDir, key, name}): DataType =>
        isDir
            ? {key, name, icon: <FolderOutlined/>}
            : {key, name, icon: <FileOutlined/>})
export const convertToSideMenuItems = (items: FlatData[]) =>
    items
        .filter(({isDir}): boolean => isDir)
        .map(({key, name}): DataType => ({key, name, icon: <FolderOutlined/>}))