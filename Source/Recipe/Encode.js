


const defaultASCII = toCharCode('?');


function toChars(string){
    return [ ... string ];
}

function toCharCode(char){
    return char.charCodeAt(0);
}

function toASCII(charCode){

    if(charCode < 256)
        return charCode;

    return defaultASCII;
}



function encodeString(string){

    const { length } = string;

    if(length > 255)
        throw `\n\tCannot encode strings longer than 255 characters.` +
              `\n\tString is ${ length } characters long.`;

    const ascii = toChars(string)
        .map(toCharCode)
        .map(toASCII);

    return [ length , ... ascii ];
}


function encodeIngredients(ingredients){

    const { length } = ingredients;

    if(length > 255)
        throw `\n\tCannot encode more than 255 ingredients.` +
              `\n\t${ length } ingredients given.`;

    return [ length , ... ingredients ];
}


function encodeRecipe(recipe){

    const { name , ingredients } = recipe;

    return [ ... encodeString(name) , ... encodeIngredients(ingredients) ];
}



export default {
    string : encodeString ,
    recipe : encodeRecipe
}
