import { startServer } from "../../core/server.js";
import type { startOptions } from "../../utils/commandOptions.js";

export function startHandler(options:startOptions):void{
    const selectedPortNumber = parseInt(options.port, 10);
    if(!isValidPort(selectedPortNumber)){
        console.log(`Invalid port number: ${selectedPortNumber}. Please provide a valid port number between 1024 and 65535.`);
    }
    else{
        startServer(selectedPortNumber);
    }
    
}

//helper functions
function isValidPort(port:number):boolean{
    if(Number.isNaN(port) || !Number.isInteger(port) || port< 1024 || port > 65535){
        return false
    }
    return true
}