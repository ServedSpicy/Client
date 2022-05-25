
import * as YAML from 'YAML';

import { saveRecipes , saveSpices } from '../Recipe/Save.js'
import { loadRecipes , loadSpices } from '../Recipe/Load.js'
import { socketPort } from 'Parameters';
import upload from '../Upload.js';


const {
    stringify : toJSON ,
    parse : fromJSON
} = JSON;

const { log } = console;


import { blueA , reset , orangeA } from '../Misc/Colors.js'

function print(text,...style){
    log(` %c⇄%c  ${ text }`, blueA , reset , ...style );
}


let client;

async function send(message){
    client.send(toJSON(message));
}

export async function listen(){

    print(`Opening With Port: %c${ socketPort }`,orangeA);


    const { listen , serveHttp , upgradeWebSocket } = Deno;

    for await(const connection of listen({ port : socketPort })){

        const http = serveHttp(connection);
        const exchange = await http.nextRequest();

        if(!exchange)
            throw `Websocket couldn't serve request`;

        const { request } = exchange;

        const { socket , response } = upgradeWebSocket(request);

        client = socket;

        socket.onopen = () =>
            socket.send("Hello World!");

        socket.onclose = () =>
            print('Closed');

        socket.onerror = (error) =>
            console.error(`WebSocket Error : `,exchange,error);

        socket.onmessage = handleRequest;

        exchange.respondWith(response);
    }
}


const actions = {
    'upload' : upload ,
    'write' : write ,
    'read' : read
};


async function handleRequest (message){

    const { data } = message;

    try {

        const request = fromJSON(data);

        console.log('Request:',request);

        const { action } = request;

        if(action in actions)
            await actions[action](request);
        else
            print(`Unknown Request Action: %c${ action }`,orangeA);

    } catch (error) {
        console.log(error);
        socket.close();
    }
}


const readable = {
    'Recipes' : loadRecipes ,
    'Spices' : loadSpices
};

async function read({ resource }){

    print(`Reading Resource: %c${ resource }`,orangeA);

    if(resource in readable){

        const data = await readable[resource]();

        log('Data',data);

        await send({ resource , data });

        return;
    }

    print(`Unknown Resource: %c${ resource }`,orangeA);
}



const writable = {
    'Recipes' : saveRecipes ,
    'Spices' : saveSpices
};

async function write({ resource , data }){

    print(`Saving Resource: %c${ resource }`,orangeA);

    if(resource in writable){

        log('Data',data);

        const json = fromJSON(data);

        await writable[resource](json);

        return;
    }

    print(`Unknown Resource: %c${ resource }`,orangeA);
}
