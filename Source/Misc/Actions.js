

import { fetchAction } from './Script.js'


const [
    action_desktop_entry ,
    action_uninstall ,
    action_update
] = [
    'DesktopEntry'
    'Uninstall' ,
    'Update'
].map(toURL);


function toURL(type){
    return `https://servedspicy.github.io/Action/${ type }.html`;
}

async function runAction(url){
    const action = await fetchAction(url);
    await action();
}



export async function update(){
    await runAction(action_update);
}

export async function uninstall(){
    await runAction(action_uninstall);
}

export async function installDesktopDentry(){
    await runAction(action_desktop_entry);
}
