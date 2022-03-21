
import { join , dirname , fromFileUrl } from 'Path';

const { url } = import.meta;
const { log } = console;

const root = join(dirname(fromFileUrl(url)),'..','..');

log('The root directory of this webserver is:',root);

const resources = join(root,'..','Interface','Source');


export const index = join(resources,'App.html');
export const css  = join(resources,'css');
export const img  = join(resources,'img');
export const js   = join(resources,'js');
