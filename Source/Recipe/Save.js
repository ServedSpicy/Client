
import * as YAML from 'YAML';

import * as Paths from 'Paths'


// const home = Deno.env.get('HOME');

// const configs = `${ home }/.config/ServedSpicy/`;


function formatRecipe(recipe){

    const lines = [];

    lines.push(`${ recipe.name }:`);
    lines.push(`  Used: ${ recipe.used }`);
    lines.push(`  Spices:`);

    if(recipe.spices.length > 0)
        recipe.spices.forEach(([ spice , amount ]) => {
            lines.push(`    ${ spice } : ${ amount }`);
        });

    return lines.join('\n');
}

export async function saveRecipes(recipes){

    const path = Paths.recipes;

    // const config = `${ configs }/Recipes.yaml`;

    let data = '';

    data += `\n# The list of spice mixes.\n\n`;

    data += recipes
        .map(formatRecipe)
        .join('\n\n');

    await Deno.writeTextFile(config,data);
}

export async function saveSpices(spices){

    const path = Paths.spices;

    // const config = `${ configs }/Spices.yaml`;

    let data = '';

    data += `\n# The list of spice containers.\n\n`;

    data += spices
        .map((spice) => spice ?? '')
        .map((spice) => `- ${ spice }`)
        .join('\n');

    await Deno.writeTextFile(config,data);
}
