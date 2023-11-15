export interface Data {
    key: string,
    name: string,
    children?: Data[]
}

export type FlatData = Omit<Data, "children"> & { isDir: boolean };