import { existsSync, readFileSync, writeFileSync } from "fs";
import type { addOptions } from "../../utils/commandOptions";
import * as path from "path";

const validMethods = ['GET','POST','PUT','DELETE'];

export function addHandler(options:addOptions):void{
    const newEndpoint = {
        'method': options.method,
        'path': options.path,
        'response': JSON.parse(options.response),
        'status': Number(options.status)
    };

    const configFilePath = path.join(process.cwd(),"testapi.json");

    try{
        //throws error if testapi.json doesnt exist.
        doesConfigFileExist(configFilePath);

        //throws error if the method is not GET,POST,PUT or DELETE.
        isValidMethod(options.method);

        const configFileContents = readFileSync(configFilePath,"utf-8");
        const data = JSON.parse(configFileContents);

        //throws error if newEndpoint.method and newEndpoint.path already exists in data.endpoints
        doesEndpointExist(data.endpoints,newEndpoint); 

        data.endpoints.push(newEndpoint);
        const newConfigFileContent = JSON.stringify(data,null,2);
        writeFileSync(configFilePath,newConfigFileContent,"utf-8");
        
    }
    catch(err){
        console.log((err as Error).message);
    }
}

//helper functions
function isValidMethod(method:string):void{
    if(!validMethods.includes(method)){
        throw new Error("Invalid method. Try GET,POST,PUT or DELETE.")
    }
}

function doesConfigFileExist(path:string):void{
    if(!existsSync(path)){
        throw new Error("testapi.json not found. Use 'init' to create one.");
    }
}

function doesEndpointExist(endpoints:addOptions[],newEndpoint:addOptions):void{
    const exists = endpoints.some((x:any)=>{
        return x.method === newEndpoint.method && x.path === newEndpoint.path
    });
    
    if(exists){
        throw new Error("Endpoint already exist. Go to testapi.json to modify it.")
    }
}