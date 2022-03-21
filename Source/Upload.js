
import * as YAML from 'YAML';


const { log } = console;

const home = Deno.env.get('HOME');


async function readYAML(resource){
    const path = `${ home }/.config/ServedSpicy/${ resource }.yaml`;
    const text = await Deno.readTextFile(path);
    return await YAML.parse(text);
}

async function readSpices(){
    return await readYAML('Spices');
}

async function readRecipes(){
    return await readYAML('Recipes');
}


function resolveRecipes(recipes,spices){

    const names = new Map;

    spices
    .map((spice,index) => [ spice , index ])
    .filter(([ spice ]) => spice)
    .forEach((args) => names.set(...args));

    console.log(names);

    for(const recipe in recipes){
        recipes[recipe] = recipes[recipe]
        .map(([ spice , amount ]) => {

            const position = names.get(spice);

            if(Number.isInteger(position))
                return [ position , amount ];

            throw `Invalid spice position : ${ position } | ${ spice }`;
        });
    }
}


function encodeString(string){

    const chars = [...string]
        .map((c) => c.charCodeAt(0))
        .map((code) => code > 255 ? 63 : code);

    return [ string.length , chars ];
}

function encodeRecipes(recipes){
    return Object
        .entries(recipes)
        .map(([ name , ingredients ]) => {
            return [ encodeString(name) , [ ingredients.length , ...ingredients ] ]
        });
}


import { synchronize } from './Serial.js';

export default async function upload(){

    const spices = await readSpices();

    console.log('Spices',spices);

    //  Dummy Recipe List

    let recipes = {
        'Chicken Mix' : [
            [ 'Oregano' , 4 ] ,
            [ 'Testing1' , 8 ] ,
            [ 'nice' , 6]
        ]
    };

    resolveRecipes(recipes,spices);

    console.log(recipes);

    recipes = encodeRecipes(recipes);

    console.log(recipes);

    const data = recipes.flat(3);

    data.unshift(recipes.length);

    console.log('Bytes',data);
    console.log('Count',data.length);

    if(data.length > 1022){
        console.warn('Byte count exceeds 1024 : ',data.length);
        return;
    }


    // log(`Setting Up Test`);




    const bytes = data;

    log('Bytes :',bytes);


    console.log(bytes);

    const exitCode = await synchronize(bytes);

    switch(exitCode){
    case  1 : log(`Success`);           break;
    case  0 : log(`Unknown Error`);     break;
    case -1 : log(`Timeout`);           break;
    case -2 : log(`Machine Not Ready`); break;
    }


}
