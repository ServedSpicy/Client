
import { ErrorHandler , Logger , Router } from 'Middleware';
import { webserverPort } from 'Parameters';
import { Application } from 'Oak';

const { log } = console;



const app = new Application;

app.use(ErrorHandler);
app.use(Logger);
app.use(Router);



import { init } from './Socket.js';

const socketProcess = new Promise((resolve,reject) => {

    log('Starting Socket Server');

    try { init().then(resolve); }
    catch (error) {
        console.log(error);
    }
});


log(`\nStarting with port: ${ webserverPort }\n`);

const webserverProcess = new Promise((resolve,reject) => {

    log('Starting Webserver');

    try {
        app
        .listen({ port : webserverPort })
        .then(resolve);
    } catch (error) {
        console.log(error);
    }
});


await Promise.all([ socketProcess , webserverProcess ]);
