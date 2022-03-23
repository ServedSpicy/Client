

const { isInteger } = Number;


function resolveRecipe(recipe,spices){

    function resolveSpice(spice){

        const { name , amount } = spice;

        if(spices.has(name)){

            const container = spices.get(name);

            return [ container , amount ];
        }

        throw `\n\tSpice cannot be resolved as no container is filled with it.` +
              `\n\tRecipe : ${ recipe.name } \tSpice : ${ name } \tAmount : ${ amount }`;
    }

    const { ingredients } = recipe;

    recipe.ingredients = ingredients
        .map(resolveSpice);

    return recipe;
}


function resolveRecipes(recipes,spices){
    return recipes.map((recipe) => resolveRecipe(recipe,spices));
}


export default {
    recipe : resolveRecipe ,
    recipes : resolveRecipes
}
