import {data} from "./data.ts";
import {Data, FlatData} from "./types.ts";

export const flatData = (function (){
    const obj:{[k:string]: FlatData} = {};
    const flatter = (data: Data[]) => {

       data.forEach(({children, ...rest})=>{
           if(children) {
               obj[rest.key] = {...rest, isDir: true}
               children.length && flatter(children)
           }
           else {
               obj[rest.key] = {...rest, isDir: false}
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