import { startServer } from "../../core/server.js";

export function startHandler(port:string):void{
    const selectedPortNumber = parseInt(port, 10);
    if(!isValidPort(selectedPortNumber)){
        console.log("Invalid port number.");
    }
    else{
        startServer(selectedPortNumber);
    }
    
}

//helper functions
function isValidPort(port:number):boolean{
    if(Number.isNaN(port) || !Number.isInteger(port) || port< 1 || port > 65535){
        return false
    }
    return true
}