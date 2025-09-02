import * as path from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";


export function initHandler(): void{
    const configFilePath = path.join(process.cwd(),"testapi.json");
    const defaultConfig = JSON.stringify(
        {
            projectName: "my-api",
            version: "1.0.0",
            endpoints: []
        },null,2
    );
    
    if(!existsSync(configFilePath)){
        try{
        writeFileSync(configFilePath,defaultConfig,"utf-8");
        console.log("Project initialized.");            
        }
        catch(err){
            console.log("Failed to initialize test api: ");
            console.log((err as Error).message);
        }
    }
    else{
        try{
            const configFileContent = readFileSync(configFilePath,"utf-8");
            JSON.parse(configFileContent);
            console.log("Project is already initialized.");
        }
        catch(err){
            console.log("Failed to load testapi.json. Invalid JSON format.");
            console.log((err as Error).message);
        }
    }
}

