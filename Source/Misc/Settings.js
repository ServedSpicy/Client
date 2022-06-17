import { readAll } from 'Conversion';
import { parse , stringify } from 'YAML';
import * as Paths from 'Paths';

const { readTextFile } = Deno;
const { warn } = console;




export async function loadSettings(){

    const path = Paths.settings;

    let raw;

    try {

        const file = await Deno.open(path,{
            create : true ,
            write : true ,
            read : true
        });

        raw = new TextDecoder('utf-8').decode(await readAll(file));

        await Deno.close(file.rid);

    } catch (error) {

        warn(error);

        return {
            error : {
                type : 'FailedToReadFile' ,
                message : error
            }
        };
    }

    let data;

    try {
        data = parse(raw);
    } catch (error) {

        warn(error);

        return {
            data ,
            error : {
                type : 'CouldntParseYAML' ,
                message : error
            }
        };
    }

    console.log('yaml data',data);

    data ??= {};

    return { data };

    return {
        error : {
            type : 'NoDataAvailable'
        }
    }
}


export async function saveSettings(settings){

    const config = Paths.settings;

    const data = stringify(settings);

    await Deno.writeTextFile(config,data);
}
