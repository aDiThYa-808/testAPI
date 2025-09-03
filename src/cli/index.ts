import { initHandler } from "./commands/init.js";
import { startHandler } from "./commands/start.js";
import { addHandler } from "./commands/add.js";

console.log("testAPI CLI running...");

const args = process.argv.slice(2);
const portFlagIndex = args.indexOf('--port');
const port = (portFlagIndex !== -1 )? args[portFlagIndex + 1] : undefined;


const validCommands = ["init", "start", "add"];
type Commands = "init" | "start" | "add";
type CommandHandler = (arg:string)=>void;

const rawCommand = args[0]; 

const commandMap: Record<Commands, CommandHandler> = {
  init: initHandler,
  start: startHandler,
  add: addHandler,
};

if (!rawCommand || !isCommand(rawCommand)) {
  console.log("invalid command. try init, start or add");
} else {
  commandMap[rawCommand]?.(port || '5050');
}

//helper functions
function isCommand(cmd: any): cmd is Commands {
  return validCommands.includes(cmd);
}
