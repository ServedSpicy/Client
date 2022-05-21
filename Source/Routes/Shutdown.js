
const { log } = console;


async function handle(context){

    log('Webserver was requested to shut down.');

    Deno.exit(0);
}


export default handle;
