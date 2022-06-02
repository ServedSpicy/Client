#!/usr/bin/env -S deno run --allow-net --allow-env


import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';


const { log } = console;


export async function fetchAction(url){

    const response = await fetch(url);

    const html = await response.text();

    // log(html);

    const page = new DOMParser().parseFromString(html,'text/html');


    const { content } = findMeta();

    const [ delay , url ] = content
        .split(';')
        .map((value) => value.trim());

    const link = url
        .split('=')[1]
        .slice(1,-1);

    // log(link);

    const { default : action } = await import(link);

    return action;

    // log(action);
}


function findMeta(){
    for(const node of page.head?.childNodes ?? [])
        if(node.nodeName === 'META')
            return node.attributes;
}

// log(page.head);

// log(page.body)
