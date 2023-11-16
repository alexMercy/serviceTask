import axios from "axios";
import {flatData} from "./data-transform.ts";
import {FileNode, FlatData, SiblingsFileNode} from "./types.ts";


const fetchDelay = 1000;

export const getFileNode = (nodeKey = '') => {
    return axios.get<FileNode>('/getFileNode', {params: {nodeKey}})
        .catch(()=> getLocalFileNode(nodeKey))
}

function getLocalFileNode(nodeKey: string): Promise<{data: FileNode }>{
    const parentNodeKey = nodeKey || "_";
    console.log(flatData);
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

export const getSiblings = (nodeKey = '') => {
    return axios.get<SiblingsFileNode>('/getSiblings', {params: {nodeKey}})
        .catch(()=> getLocalSiblings(nodeKey))
}

function getLocalSiblings(nodeKey:string): Promise<{data: SiblingsFileNode }> {

    let siblings: FlatData[] = [];
    let parent: FlatData;

    switch (true) {
        case nodeKey === "":
            parent = {} as FlatData;
            siblings = [];
            break;

        case nodeKey === "_":
            parent = {} as FlatData;
            siblings = [flatData["_"]];
            break;

        case !!nodeKey.match(/^[0-9]$/):
            parent = flatData["_"];
            siblings = Object.values(flatData)
                .filter(({key}) => key.match(/^[0-9]$/))
            break;

        case !!nodeKey.match(/^[0-9]-/):
            parent = flatData[nodeKey.slice(0,-2)];
            siblings = Object.values(flatData)
                .filter(({key}) => {
                    const re = new RegExp(`^${nodeKey.slice(0,-1)}[0-9]$`)
                    return key.match(re)
                })
    }


     // Object.values(flatData)
     //    .filter(({key}) => {
     //        const isDigit = !!nodeKey.match(/^[0-9]$/)
     //        const reKey = isDigit ? '' : `${nodeKey}-`
     //        const re = new RegExp(`^${reKey}[0-9]$`);
     //        return key.match(re)
     //    })


    return new Promise(resolve => {
        setTimeout(()=>{
            resolve({data: { parent, siblings }})
        }, fetchDelay)
    })
}

export const search = (text = '') => {
    return axios.get<FlatData>('/getFileNode', {params: {text}})
        .catch(()=> localSearch(text))
}

function localSearch(text: string): Promise<{data: FlatData }> {

    const fileNode = Object.values(flatData).find(({name}) => name.match(text))!


    return new Promise(resolve => {
        setTimeout(()=>{
            resolve({data: fileNode })
        }, fetchDelay)
    })
}