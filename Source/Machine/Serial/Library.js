

import { join , dirname , fromFileUrl } from 'Path';
import { serial as print , prettifyPath , orangeA } from 'Log';
import { toBytes } from './Serialize.js';
import { isRelease } from 'App';
import System from 'System';


const { dynamicExtension : dynamic } = System;
const { dlopen } = Deno;
const { log } = console;


const definitions = {
    synchronize : {
        parameters : [ 'pointer' , 'pointer' , 'i16' ],
        nonblocking : true ,
        result : 'i32'
    }
};


const cwd = dirname(fromFileUrl(import.meta.url));


const pathToSerial = (isRelease)
    ? '../../..'
    : '../../../../Serial/Build' ;


const libraryPath = join(cwd,pathToSerial,`Serial.${ dynamic }`);

const libraryPath_pretty = prettifyPath(libraryPath,{
    lineLimit : 30 ,
    padLine : 23
});

print(`Library Location: %c${ libraryPath_pretty }`,orangeA);


const Serial = dlopen(libraryPath,definitions).symbols;


const { usbPath } = System;

print(`Device Path: %c${ usbPath }`,orangeA);

const device = toBytes(usbPath);

export async function synchronize(bytes,size){
    return await Serial.synchronize(
        new Uint8Array(device),
        new Uint8Array(bytes),
        size);
}
