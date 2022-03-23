
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


import Encode from './Recipe/Encode.js';
import Resolve from './Recipe/Resolve.js';


function encodeRecipes(recipes){
    return Object
        .entries(recipes)
        .map(([ name , ingredients ]) => { name , ingredients })
        .map(Encode.recipe);
}


import { synchronize } from './Serial.js';

export default async function upload(){

    const spices = await readSpices();

    console.log('Spices',spices);

    //  Dummy Recipe List

    let recipes = [{
        name : 'Chicken Mix' ,
        ingredients : [{
            name : 'Oregano' ,
            amount : 4
        },{
            name : 'test' ,
            amount : 8
        },{
            name : 'nice' ,
            amount : 6
        }]
    },{
        name : 'Mistery Mix' ,
        ingredients : [{
            name : 'Oregano' ,
            amount : 4
        },{
            name : 'test' ,
            amount : 8
        },{
            name : 'nice' ,
            amount : 6
        }]
    }];




    const names = new Map;

    spices
    .map((spice,index) => [ spice , index ])
    .filter(([ spice ]) => spice)
    .forEach((args) => names.set(...args));

    recipes = Resolve.recipes(recipes,names);

    console.log(recipes);

    // recipes = encodeRecipes(recipes);
    recipes = recipes.map(Encode.recipe);

    console.log(recipes);

    const data = recipes.flat(3);

    data.unshift(recipes.length);

    console.log('Bytes',data);
    console.log('Count',data.length);

    if(data.length > 1022){
        console.warn('Byte count exceeds 1024 : ',data.length);
        return;
    }


    const bytes = data;

    log('Bytes :',bytes);

    const exitCode = await synchronize(bytes);

    switch(exitCode){
    case  1 : log(`Success`);           break;
    case  0 : log(`Unknown Error`);     break;
    case -1 : log(`Timeout`);           break;
    case -2 : log(`Machine Not Ready`); break;
    }


}
