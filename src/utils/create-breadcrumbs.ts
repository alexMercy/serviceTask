import {FlatData} from "./types.ts";
import {indexedData} from "./data-transform.ts";

export const createBreadcrumbs = (parent: FlatData) => {
    if (!Object.keys(parent).length) return [];
    const nodesQueue = parent.key.split("-").reverse();
    const result = [{title: 'root', id: '_'}]
    const getNodeBreadcrumb = (node: any, key = '') => {
        if(!nodesQueue.length) return [];
        const nodeKey = `${key ? key+"-" : ''}${nodesQueue.pop()}`;
        const newNode = node.children[nodeKey];
        result.push({title: newNode.name, id: newNode.key});
        getNodeBreadcrumb(newNode, nodeKey);

    }
    if(nodesQueue[0] !== "_")
        getNodeBreadcrumb(indexedData['_']);
    return result
}