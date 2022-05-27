
import { webserver as print , orangeA , reset } from 'Log'


const millis = () =>
    Date.now();


async function logger(context,next){

    const begin = millis();

    await next();

    const delta = `${ millis() - begin }`;

    const { method , url } = context.request;

    print(`%c${ method } %c: %c${ delta.padStart(2,' ') }ms %c: %c${ url.pathname }`,
        orangeA,reset,orangeA,reset,orangeA);
}


export default logger;
