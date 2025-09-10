import { initHandler } from "./commands/init.js";
import { startHandler } from "./commands/start.js";
import { addHandler } from "./commands/add.js";
import type {
  initOptions,
  startOptions,
  addOptions,
  helpOptions,
} from "../utils/commandOptions.js";
import { colors,reset } from "../utils/ANSIcodes.js";
import { helpHandler } from "./commands/help.js";

const args = process.argv.slice(2);

const validCommands = ["init", "start", "add", "help"];

type Commands = "init" | "start" | "add" | "help";

type CommandOptionsMap = {
  init: initOptions;
  start: startOptions;
  add: addOptions;
  help: helpOptions;
};

type CommandHandler = {
  [k in keyof CommandOptionsMap]: (options: CommandOptionsMap[k]) => void;
};

const commandMap: CommandHandler = {
  init: initHandler,
  start: startHandler,
  add: addHandler,
  help: helpHandler
};

try {
  //args[0] contains the main command i.e 'init', 'start', 'add' etc
  const rawCommand = args[0];

  //optionsRecord contains a Record in which all flags are mapped to their values.
  const optionsRecord = parseFlagsToOptions(args);

  //optionMapper maps each command with the arguments that the commandHandler requires.
  const optionMapper: Record<Commands,((otps:Record<string,string>)=>any)> ={
    init: ()=>({}),
    start: (opts)=>({
      port: opts.port,
    }),
    add: (opts)=>({
      method: opts.method,
      path: opts.path,
      response: opts.response,
      status: opts.status ? Number(opts.status) : undefined  // status is converted from string to number.
    }),
    help: ()=>({})
  }

  if (!rawCommand || !isCommand(rawCommand)) {
    console.log(colors.red+"[ERROR]: Invalid command."+reset);
    console.log("[INFO]: For detailed usage instructions, run 'testapi-cli help'.");
    
  } else {
    //typedOptions contains all the args with the correct type required by the commandHandler
    const typedOptions = optionMapper[rawCommand](optionsRecord);
    commandMap[rawCommand]?.(typedOptions);
  }
} catch (err) {
  console.log((err as Error).message);
}


//helper functions

//returns true only if cmd is a part of the validCommands array.
function isCommand(cmd: any): cmd is Commands {
  return validCommands.includes(cmd);
}

//returns a Record that contain flags and their values. throws an error if a flag or value is missing.
function parseFlagsToOptions(args: string[]): Record<string, string> {
  const options: Record<string, string> = {};
  for (let i = 1; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];

    if (!flag || !value) throw new Error(colors.red + "[ERROR]: Flag or value not found." + reset + " [INFO]: For detailed usage instructions, run 'testapi-cli help'.");

    const key = flag.replace(/^--/, "");
    options[key] = value;
  }
  return options;
}
