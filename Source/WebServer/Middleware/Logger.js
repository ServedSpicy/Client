
const { log } = console;


const millis = () =>
    Date.now();


async function logger(context,next){

    const begin = millis();

    await next();

    const delta = `${ millis() - begin }`;

    const { method , url } = context.request;

    log(`${
        method.padEnd(6,' ')
    } : ${
        delta.padStart(4,' ')
    }ms : ${ url.pathname }`);
}


export default logger;
