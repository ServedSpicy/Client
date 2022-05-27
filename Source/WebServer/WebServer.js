
import { ErrorHandler , Logger , Router } from 'Middleware';
import { webserverPort as port } from 'App';
import { webserver as print , orangeA } from 'Log';
import { Application } from 'Oak';


export async function listen(){

    print(`Listening On Port: %c${ port }`,orangeA);


    const app = new Application;

    app.use(ErrorHandler);
    app.use(Logger);
    app.use(Router);

    await app.listen({ port });
}
