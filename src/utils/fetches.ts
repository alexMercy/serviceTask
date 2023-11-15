import axios from "axios";
import {flatData} from "./data-transform.ts";

export const getFileNode = (nodeKey = '') => {
    return axios.get('/getFileNode', {
        params: {
            nodeKey
        }
    }).catch(()=> {
        getLocalFileNode(nodeKey)
    })
}

function getLocalFileNode(nodekey: string) {

    flatData
}