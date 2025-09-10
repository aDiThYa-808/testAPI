import { existsSync, readFileSync } from "fs";
import * as http from "http";
import * as path from "path";
import { URL } from "url";
import type { addOptions } from "../utils/commandOptions";
import { colors, reset } from "../utils/ANSIcodes.js";

export function startServer(port: number): void {
  try {
    const configFilepath = path.join(process.cwd(), "testapi.json");
    doesConfigFileExist(configFilepath);

    const configFileContents = readFileSync(configFilepath,"utf-8");
    const data = JSON.parse(configFileContents);
    const endpoints = data.endpoints;

    const server = http.createServer((req, res) => {
      const method = req.method?.toUpperCase() || "";
      const url = new URL(req.url || "", "http://localhost");
      const path = url.pathname;

      const response = getResponse(endpoints,method,path) || {"message":"no response"};
      const statusCode = getStatusCode(endpoints,method,path);

      res.writeHead(statusCode || 200, { "Content-Type": "application/json" });

      res.end(JSON.stringify(response));
    });

    server.listen(port, "localhost", () => {
      console.log(`${colors.green}[SUCCESS]:Server running at${reset} http://localhost:${port}/`);
    });
  } catch (err) {
    console.log((err as Error).message);
  }
}

//helper functions
function doesConfigFileExist(path: string): void {
  if (!existsSync(path)) {
    throw new Error(`${colors.red}[ERROR]: testapi-cli not initialized.${reset}. [INFO]: Run 'testapi-cli init'`);
  }
}

export function getResponse(endpoints:addOptions[],method:string,path:string):any | undefined{
    const match = endpoints.find((x:addOptions)=>
        x.method === method && x.path === path
    );

    if(match){
        return match.response;
    }
    else{
        return undefined;
    }
}

export function getStatusCode(endpoints:addOptions[],method:string,path:string):number | undefined{
    const match = endpoints.find((x:addOptions)=>
        x.method === method && x.path === path
    );

    if(match){
        return match.status ? match.status : undefined
    }
    else{
        return 404
    }
}
