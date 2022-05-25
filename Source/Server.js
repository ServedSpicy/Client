
import { ErrorHandler , Logger , Router } from 'Middleware';
import { webserverPort } from 'Parameters';
import { Application } from 'Oak';

const { log } = console;



const app = new Application;

app.use(ErrorHandler);
app.use(Logger);
app.use(Router);



import { init } from './WebSocket/Socket.js';

const socketProcess = new Promise(async (resolve,reject) => {

    log('Starting Socket Server');

    try { init().then(resolve); }
    catch (error) {
        console.log(error);
        reject();
    }
});


log(`\nStarting with port: ${ webserverPort }\n`);

const webserverProcess = new Promise(async (resolve,reject) => {

    log('Starting Webserver');

    try {
        app
        .listen({ port : webserverPort })
        .then(resolve);
    } catch (error) {
        console.log(error);
        reject();
    }
});


const process_browser = new Promise(async (resolve,reject) => {

    log('Starting Browser');

    try {

        const browser = new Worker(new URL('./WebView/Browser.js',import.meta.url).href,{
            type : 'module' ,
            deno : { namespace : true }
        });

        browser.addEventListener('exit',resolve);

        setTimeout(() => {
            browser.postMessage({ port : webserverPort });
        },200);

    } catch (error) {
        console.log(error);
        reject();
    }

});


await Promise.any([ socketProcess , webserverProcess , process_browser ]);
