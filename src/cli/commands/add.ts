import { existsSync, readFileSync, writeFileSync } from "fs";
import type { addOptions } from "../../utils/commandOptions";
import * as path from "path";

export function addHandler(options:addOptions):void{
    const newEndpoint = {
        'method': options.method,
        'path': options.path,
        'response': JSON.parse(options.response),
        'status': options.status
    };

    const configFilePath = path.join(process.cwd(),"testapi.json");
    
    if(!existsSync(configFilePath)){
        console.log("testapi not initialized. Use init.");
    }
    else{
        const configFileContents = readFileSync(configFilePath,"utf-8");
        const data = JSON.parse(configFileContents);
        data.endpoints.push(newEndpoint);
        const newConfigFileContent = JSON.stringify(data,null,2);
        writeFileSync(configFilePath,newConfigFileContent,"utf-8")
    }
}