
import { join , dirname , fromFileUrl } from 'Path';
import { general as print , prettifyPath , orangeA } from 'Log';


const { url } = import.meta;
const { log } = console;


/**
 *  @brief  Folder of the bundled app.
 */

export const folder = join(dirname(fromFileUrl(url)),'..','..');


const folder_pretty = prettifyPath(folder,{
    lineLimit : 30 ,
    padLine : 19
});

print(`Client Folder: %c${ folder_pretty }`,orangeA);


import { parse } from 'Flags';
const { args } = Deno;


const Arguments = parse(args);


if(!Arguments.webserverPort)
    throw `Please specify a port for the webserver with --socketPort <Port>`;

export const webserverPort = Arguments.webserverPort;


if(!Arguments.socketPort)
    throw `Please specify a port for the socket connection with --webserverPort <Port>`;

export const socketPort = Arguments.socketPort;


export const isRelease = args.includes('release');
