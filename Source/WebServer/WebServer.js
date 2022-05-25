
import { ErrorHandler , Logger , Router } from 'Middleware';
import { webserverPort as port } from 'Parameters';
import { Application } from 'Oak';


const { log } = console;


export async function listen(){


    log(`\nStarting with port: ${ port }\n`);


    const app = new Application;

    app.use(ErrorHandler);
    app.use(Logger);
    app.use(Router);

    await app.listen({ port });
}
