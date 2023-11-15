import {data} from "./data.ts";
import {Data, FlatData} from "./types.ts";

export const flatData = (function (){
    const obj:{[k:string]: FlatData} = {};
    const flatter = (data: Data[]) => {

       data.forEach(({children, ...rest})=>{
           if(children?.length) {
               obj[rest.key] = {...rest, isDir: true}
               flatter(children)
           }
           else {
               obj[rest.key] = {...rest, isDir: false}
           }
       })
    }

    flatter(data)

    return obj;
})()