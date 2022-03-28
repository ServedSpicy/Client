
import{ parse } from 'YAML';


const { env , realPath , readTextFile } = Deno;
const { warn } = console;

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

    let raw;

    try {
        raw = await readTextFile(path);
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

    if(data)
        return parseRecipes(data);

    return {
        error : {
            type : 'NoDataAvailable'
        }
    }
}

function parseRecipes(data){

    if(Array.isArray(data))
        return {
            data ,
            error : {
                type : 'WrongStructure' ,
                message : 'Array'
            }
        }

    const recipes = [];

    for(const name in data){

        if(name.length > 20){
            recipes.push({
                name ,
                error : {
                    type : 'NameTooLong'
                }
            });

            continue;
        }

        const value = data[name];

        if(value){
            if(typeof value === 'object'){

                let used = false;
                const spices = [];

                if('Used' in value){

                    if(typeof value.Used === 'boolean'){
                        used = value.Used;
                    } else {
                        recipes.push({
                            name ,
                            value ,
                            used : value.Used ,
                            error : {
                                type : 'RecipeUsageNotBoolean'
                            }
                        });

                        continue;
                    }
                }


                if('Spices' in value){

                    const spiceData = value.Spices;

                    if(typeof spiceData === 'object'){

                        for(const spice in spiceData){

                            const amount = spiceData[spice];

                            if(typeof amount === 'number'){

                                if(amount % 1 > 0){
                                    recipes.push({
                                        name ,
                                        used  ,
                                        spices : spiceData ,
                                        error : {
                                            type : 'RecipeSpiceAmountNotInteger'
                                        }
                                    });

                                    continue;
                                } else {
                                    spices.push([ spice , amount ]);
                                }


                            } else {
                                recipes.push({
                                    name ,
                                    used  ,
                                    spices : spiceData ,
                                    error : {
                                        type : 'RecipeSpiceAmountNotNumber'
                                    }
                                });

                                continue;
                            }
                        }

                    } else {
                        recipes.push({
                            name ,
                            used  ,
                            spices : spiceData ,
                            error : {
                                type : 'RecipeSpicesNotObject'
                            }
                        });

                        continue;
                    }
                }

                recipes.push({ name , used , spices });

                continue;

            } else {
                recipes.push({
                    name ,
                    value ,
                    error : {
                        type : 'RecipeDataIsntObject'
                    }
                });

                continue;
            }
        } else {
            recipes.push({
                name ,
                error : {
                    type : 'MissingRecipeData'
                }
            });

            continue;
        }
    }

    return {
        recipes
    };
}
