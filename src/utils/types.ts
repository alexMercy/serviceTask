export interface Data {
    key: string,
    name: string,
    children?: Data[]
}

export type FlatData = Omit<Data, "children"> & { isDir: boolean };

export interface FileNode  {
        parent: FlatData,
        childs: FlatData[]
}