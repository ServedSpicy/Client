
import { serializeWord } from './Serialize.js';
import { synchronize } from './Library.js';
import System from 'System';


const { log } = console;


export default async function (bytes){

    let { length } = bytes;

    log('ByteCount: ',length);

    bytes = [
        ...serializeWord(length),
        ...bytes
    ];

    length += 2;

    return await synchronize(bytes,length);
}
