

import { join , dirname , fromFileUrl } from 'Path';
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

log(`Serial Library: ${ libraryPath }`);


const Serial = dlopen(libraryPath,definitions).symbols;


const { usbPath } = System;

log('Device :',usbPath);

const device = toBytes(usbPath);

export async function synchronize(bytes,size){
    return await Serial.synchronize(
        new Uint8Array(device),
        new Uint8Array(bytes),
        size);
}
