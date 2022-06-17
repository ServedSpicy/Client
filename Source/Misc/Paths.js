

import { ensureDir } from 'File'
import { join } from 'Path';


const { env , args } = Deno;

const home = env.get('HOME');


export const config =
    join(home,'.config','ServedSpicy');

export const spices =
    join(config,'Spices.yaml');

export const recipes =
    join(config,'Recipes.yaml');

export const settings =
    join(config,'Settings.yaml');

await ensureDir(config);
