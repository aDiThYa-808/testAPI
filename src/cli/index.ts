import { initHandler } from "./commands/init.js";
import { startHandler } from "./commands/start.js";
import { addHandler } from "./commands/add.js";

console.log("testAPI CLI running...");

const args = process.argv.slice(2);

const validCommands = ["init", "start", "add"];
type Commands = "init" | "start" | "add";

const rawCommand = args[0]; 

const commandMap: Record<Commands, () => void> = {
  init: initHandler,
  start: startHandler,
  add: addHandler,
};

if (!rawCommand || !isCommand(rawCommand)) {
  console.log("invalid command. try init, start or add");
} else {
  commandMap[rawCommand]();
}

//helper functions
function isCommand(cmd: any): cmd is Commands {
  return validCommands.includes(cmd);
}
