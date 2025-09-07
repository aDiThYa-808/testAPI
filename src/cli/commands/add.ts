import { existsSync, readFileSync, writeFileSync } from "fs";
import type { addOptions } from "../../utils/commandOptions";
import * as path from "path";

const validMethods = ['GET','POST','PUT','DELETE'];

export function addHandler(options:addOptions):void{
    const newEndpoint = {
        'method': options.method,
        'path': options.path,
        'response': JSON.parse(options.response),
        'status': options.status
    };

    const configFilePath = path.join(process.cwd(),"testapi.json");

    try{
        if(doesConfigFileExist(configFilePath) && isValidMethod(options.method)){
            const configFileContents = readFileSync(configFilePath,"utf-8");
            const data = JSON.parse(configFileContents);
            data.endpoints.push(newEndpoint);
            const newConfigFileContent = JSON.stringify(data,null,2);
            writeFileSync(configFilePath,newConfigFileContent,"utf-8")
        }
    }
    catch(err){
        console.log((err as Error).message);
    }
}

//helper functions
function isValidMethod(method:string):Boolean{
    if(!validMethods.includes(method)){
        throw new Error("Invalid method. Try GET,POST,PUT or DELETE.")
    }
    return true;
}

function doesConfigFileExist(path:string):Boolean{
    if(!existsSync(path)){
        throw new Error("testapi.json not found. Use 'init' to create one.");
    }
    return true;
}