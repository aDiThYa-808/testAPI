import type { addOptions } from "../../utils/commandOptions";

export function addHandler(options:addOptions):void{
    console.log(`method:${options.method}`);
    console.log(`path:${options.path}`);
    console.log(`response:${options.response}`);
    console.log(`status:${options.status}`);
}