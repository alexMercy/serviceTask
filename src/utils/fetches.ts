import axios from "axios";
import {flatData} from "./data-transform.ts";
import {FileNode} from "./types.ts";


const fetchDelay = 1000;

export const getFileNode = (nodeKey = '') => {
    return axios.get<FileNode>('/getFileNode', {params: {nodeKey}})
        .catch(()=> getLocalFileNode(nodeKey))
}

function getLocalFileNode(nodeKey: string): Promise<{data: FileNode }>{
    const parentNodeKey = nodeKey || "_";
    const parent = flatData[parentNodeKey];
    const childs = Object.values(flatData)
        .filter(({key}) => {
            const reKey = parentNodeKey !== "_" ? `${nodeKey}-` : ''
            const re = new RegExp(`^${reKey}[0-9]$`);
            return key.match(re)
        })

    return new Promise(resolve => {
        setTimeout(()=>{
            resolve({data: {parent, childs}})
        }, fetchDelay)
    })

}