
import { parse } from 'Flags';


const { args } = Deno;

const { webserverPort , socketPort } = parse(args);

if(!webserverPort)
    throw `Please specify a port for the webserver with --socketPort <Port>`;

if(!socketPort)
    throw `Please specify a port for the socket connection with --webserverPort <Port>`;

const release = args.includes("release");

export { webserverPort , socketPort , release };
