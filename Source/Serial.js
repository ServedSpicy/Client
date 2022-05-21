

const { log } = console;
const { os } = Deno.build;

log(`System : `,os);

function systemInfo(){
    switch(os){
    case 'linux' : return {
        libraryType : 'so' ,
        device : '/dev/ttyUSB0'
    };
    case 'windows': return {
        libraryType : 'dll' ,
        device : 'COM0'
    };
    case 'darwin' : return {
        libraryType : 'dylib' ,
        device : ''
    };
    default:
        throw `Unknown System : ${ os }`;
    }
}


const definitions = {
    synchronize : {
        parameters : [ 'pointer' , 'pointer' , 'i16' ],
        nonblocking: true ,
        result : 'i32'
    }
};


let { libraryType } = systemInfo();

import { join , dirname , fromFileUrl } from 'Path';
import { release } from './Data/Parameters.js';

const cwd = dirname(fromFileUrl(import.meta.url));

let pathToSerial = '../../Serial/Build';

if(release)
    pathToSerial = '..';

const libraryPath = `${ cwd }/${ pathToSerial }/Serial.${ libraryType }`;

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


export async function synchronize(bytes){

    const byteCount = bytes.length + 2;

    bytes = [
        byteCount >> 4 ,
        byteCount & 255 ,
        ...bytes
    ];

    let { device } = systemInfo();

    log('Device :',device);

    device = toBytes(device); // non-repeatable

    device = new Uint8Array(device);
    bytes = new Uint8Array(bytes);

    return await Serial.synchronize(device,bytes,byteCount);
}
