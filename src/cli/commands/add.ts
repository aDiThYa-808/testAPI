import { existsSync, readFileSync, writeFileSync } from "fs";
import type { addOptions } from "../../utils/commandOptions";
import * as path from "path";
import { colors,reset } from "../../utils/ANSIcodes.js";

const validMethods = ['GET','POST','PUT','DELETE'];

export function addHandler(options:addOptions):void{
    const newEndpoint = {
        'method': options.method.toUpperCase(),
        'path': options.path,
        'response': JSON.parse(options.response),
        'status': Number(options.status)
    };

    const configFilePath = path.join(process.cwd(),"testapi.json");

    try{
        //throws error if testapi.json doesnt exist.
        doesConfigFileExist(configFilePath);

        //throws error if the method is not GET,POST,PUT or DELETE.
        isValidMethod(newEndpoint.method);

        //throws error if the path doesnt begin with '/'.
        isValidPath(newEndpoint.path);

        const configFileContents = readFileSync(configFilePath,"utf-8");
        const data = JSON.parse(configFileContents);

        //throws error if newEndpoint.method and newEndpoint.path already exists in data.endpoints
        doesEndpointExist(data.endpoints,newEndpoint); 

        data.endpoints.push(newEndpoint);
        const newConfigFileContent = JSON.stringify(data,null,2);
        writeFileSync(configFilePath,newConfigFileContent,"utf-8");
        console.log(`${colors.green}[SUCCESS]: ${newEndpoint.method} ${newEndpoint.path} endpoint added successfully!${reset}`);
        console.log("[INFO]: The added endpoint can be found and modified in the testapi.json file.")
        
    }
    catch(err){
        console.log((err as Error).message);
    }
}

//helper functions
function isValidMethod(method:string):void{
    if(!validMethods.includes(method)){
        throw new Error(`${colors.red}Invalid method: ${method}${reset}. [INFO]: Use valid http methods like POST,GET,PUT and DELETE.`)
    }
}

function isValidPath(path:string):void{
    if(path[0] !== "/"){
        throw new Error(`${colors.red}Invalid path: ${path}${reset}. [INFO]: Path must begin with '/'.`);
    }
}

function doesConfigFileExist(path:string):void{
    if(!existsSync(path)){
        throw new Error(`${colors.red}[ERROR]: testapi-cli not initialized.${reset}. [INFO]: Run 'testapi-cli init'`);
    }
}

function doesEndpointExist(endpoints:addOptions[],newEndpoint:addOptions):void{
    const exists = endpoints.some((x:addOptions)=>{
        return x.method === newEndpoint.method && x.path === newEndpoint.path
    });
    
    if(exists){
        throw new Error(colors.green+"Endpoint already exists. Go to testapi.json to modify it."+reset);
    }
}