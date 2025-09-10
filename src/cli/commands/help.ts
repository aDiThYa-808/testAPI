import { colors,styles,reset } from "../../utils/ANSIcodes.js"

export function helpHandler():void{
    console.log(styles.bold+colors.green+"testapi-cli"+reset);
    console.log("Usage: testapi-cli <command> [options]\n");

    console.log(styles.bold+colors.green+"Commands"+reset);
    console.log(styles.bold+colors.blue+"1. init"+reset);
    console.log(`   Initialize testapi-cli.`);
    console.log(`   Creates a required testapi.json file in the current directory.\n`);

    console.log(styles.bold+colors.blue+"2. add"+reset);
    console.log(`   Add new API endpoint.`);
    console.log('   Required options:');
    console.log(`       --method:     Must be a valid HTTP method.`);
    console.log(`       --path:       Must start with '/'`);
    console.log(`       --response:   Must be valid JSON enclosed in single quotes.`);
    console.log(`   Optional:`);
    console.log(`       --status:     HTTP status code (default:200).\n`);

    console.log(styles.bold+colors.blue+"3. start"+reset);
    console.log(`   Starts the localhost server to test the APIs.`);
    console.log(`   Required option:`);
    console.log(`       --port:       Must be between 1024 and 65535\n`);
    
    //add new commands here

    console.log(styles.bold+colors.blue+"4. help"+reset);
    console.log(`   Show this help message.\n`);

    console.log(styles.bold+colors.green + "Example"+reset);
    console.log(`   testapi-cli init`);
    console.log(`   testapi-cli add --method GET --path /users --response '[{"id":1,"name":"Adithya"},{"id":2,"name":"Kohli"}]' --status 200`);
    console.log(`   testapi-cli start --port 3000`);
    console.log(`   testapi-cli help\n`);
}