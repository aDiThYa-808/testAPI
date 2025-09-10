import * as path from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { colors,styles,reset } from "../../utils/ANSIcodes.js";


export function initHandler(): void{
    const configFilePath = path.join(process.cwd(),"testapi.json");
    const defaultConfig = JSON.stringify(
        {
            projectName: "testapi-cli",
            version: "1.0.0",
            endpoints: [
                {
                    method: "GET",
                    path: "/testapi/ping",
                    response:{"message":"testapi-cli works!"},
                    status: 200
                }
            ]
        },null,2
    );
    
    if(!existsSync(configFilePath)){
        try{
        writeFileSync(configFilePath,defaultConfig,"utf-8");
        console.log(colors.green+ "[SUCCESS]: testapi-cli initialized successfully!."+reset);  
        console.log("[INFO]: For detailed usage instructions, run 'testapi-cli help'.");
        }
        catch(err){
            console.log(colors.red+"[ERROR]: Failed to initialize testapi-cli."+reset);
            console.log((err as Error).message);
            console.log("[INFO]: For detailed usage instructions, run 'testapi-cli help'.");
        }
    }
    else{
        try{
            const configFileContent = readFileSync(configFilePath,"utf-8");
            JSON.parse(configFileContent);
            console.log(colors.green+"testapi-cli is already initialized."+reset);
            console.log("[INFO]: For detailed usage instructions, run 'testapi-cli help'.")
        }
        catch(err){
            console.log(colors.red+"[ERROR]: Failed to load testapi.json. Invalid JSON format."+reset);
            console.log((err as Error).message);
            console.log("[INFO]: For detailed usage instructions, run 'testapi-cli help'.");
        }
    }
}

