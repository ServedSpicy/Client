
import { folder , isRelease } from 'App';
import { join } from 'Path';

const { log } = console;


export const resources = isRelease
    ? join(folder,'Interface')
    : join('..','Interface','Source') ;


export const css  = join(resources,'css');
export const img  = join(resources,'img');
export const js   = join(resources,'js');
