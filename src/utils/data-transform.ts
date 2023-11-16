import {data} from "./data.ts";
import {Data, FlatData} from "./types.ts";

export const flatData = (function (){
    const obj:{[k:string]: FlatData} = {};
    const flatter = (data: Data[], parentKey = "") => {

       data.forEach(({children, ...rest})=>{
           if(children) {
               obj[rest.key] = {...rest, isDir: true, parentKey}
               flatter(children, rest.key)
           }
           else {
               obj[rest.key] = {...rest, isDir: false, parentKey}
           }
       })
    }

    flatter(data)

    return obj;
})()

export const indexedData = (function () {

    const indexer = (data: Data[]) => {
        const obj: {[k:string]: any} = {}
        data.forEach(item => {
            obj[item.key] = item.children?.length
                ? {...item, children: indexer(item.children)}
                : item
            }
        )
        return obj;
    }

    return indexer(data);
})()