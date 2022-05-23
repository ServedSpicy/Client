

import { join , dirname , fromFileUrl } from 'Path';
import { release } from './Data/Parameters.js';
import System from './System.js'

const { log } = console;

const definitions = {
    synchronize : {
        parameters : [ 'pointer' , 'pointer' , 'i16' ],
        nonblocking: true ,
        result : 'i32'
    }
};



const cwd = dirname(fromFileUrl(import.meta.url));

let pathToSerial = '../../Serial/Build';

if(release)
    pathToSerial = '..';

const libraryPath = `${ cwd }/${ pathToSerial }/Serial.${ System.dynamicExtension }`;

log(`Serial Library: ${ libraryPath }`);

const library = Deno.dlopen(libraryPath,definitions);

const Serial = library.symbols;


function toChars(string){
    return [...string];
}

function toBytes(string){
    return toChars(string)
        .map((char) => char.codePointAt(0));
}

function serializeWord(number){
    const left = number >> 8;
    const right = number - (left << 8);
    return [ left , right ];
}

export async function synchronize(bytes){

    const byteCount = bytes.length;

    log('ByteCount: ',byteCount);

    bytes = [
        ...serializeWord(byteCount),
        ...bytes
    ];

    const { usbPath } = System;

    log('Device :',usbPath);

    let device = toBytes(usbPath);

    device = new Uint8Array(device);
    bytes = new Uint8Array(bytes);

    return await Serial.synchronize(device,bytes,byteCount + 2);
}
