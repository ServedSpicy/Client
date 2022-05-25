
import { webserverPort as port } from 'App';


const path = new URL('./Browser.js',import.meta.url).href;

const settings = {
    type : 'module' ,
    deno : { namespace : true }
};


const { log } = console;


let browser;


export function start(){

    log('Starting Browser Worker');

    return new Promise((resolve) => {

        browser = new Worker(path,settings);

        browser.addEventListener('exit',resolve);

        sendPort();
    });
}


function sendPort(){
    setTimeout(() => {

        browser.postMessage({ port });

    },200);
}
