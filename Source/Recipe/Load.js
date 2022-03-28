
import{ parse } from 'YAML';


const { env , realPath , readTextFile } = Deno;

const home = env.get('HOME');
const configs = `${ home }/.config/ServedSpicy/`;



export async function loadSpices(){

    let path = `${ configs }/Spices.yaml`;
    path = await realPath(path);

    const raw = await readTextFile(path);
    const data = parse(raw);

    return data;
}


export async function loadRecipes(){

    let path = `${ configs }/Recipes.yaml`;
    path = await realPath(path);

    const raw = await readTextFile(path);
    const data = parse(raw);

    return data;
}
