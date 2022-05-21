
import * as YAML from 'YAML';

import { saveRecipes , saveSpices } from './Recipe/Save.js'
import { loadRecipes , loadSpices } from './Recipe/Load.js'
import { socketPort } from 'Parameters';
import upload from './Upload.js';


let client;

async function send(message){
    client.send(JSON.stringify(message));
}

export async function init(){

    console.log(`Starting websocket with port: ${ socketPort }`);


    const { listen } = Deno;

    for await(const connection of listen({ port : socketPort })){

        const http = Deno.serveHttp(connection);
        const exchange = await http.nextRequest();

        if(!exchange)
            throw `Websocket couldn't serve request`;

        const { socket , response } = Deno.upgradeWebSocket(exchange.request);

        client = socket;

        socket.onopen = () =>
            socket.send("Hello World!");

        socket.onclose = () =>
            console.log(`WebSocket has been closed.`);

        socket.onerror = (error) =>
            console.error(`WebSocket Error : `,exchange,error);

        socket.onmessage = async (message) => {

            const { data } = message;

            try {

                const request = JSON.parse(data);

                console.log(request);

                const { action } = request;

                switch(action){
                case 'upload' : {

                    upload();

                    // socket.close();
                    return;
                }
                case 'read': {

                    const { resource } = request;

                    console.log(`Requsting resource : `,resource);

                    switch(resource){
                        case 'Recipes' : {
                            const data = await loadRecipes();
                            await send({ resource , data });
                            break;
                        }
                        case 'Spices' : {
                            const data = await loadSpices();
                            await send({ resource , data });
                            break;
                        }
                    }

                    // socket.close();
                    return;
                }
                case 'write': {

                    const { resource } = request;

                    console.log(`Saving Resource :`,resource);

                    switch(resource){
                        case 'Recipes' : {

                            const { data } = request;

                            console.log('Data',data);

                            const json = JSON.parse(data);

                            await saveRecipes(json);

                            // await saveRecipes(
                            //     Object
                            //     .entries(json)
                            //     .map(([ name , recipe ]) => ({ name , used : recipe.Used , spices : new Map(Object.entries(recipe.Spices)) })))

                            // await Deno.writeTextFile(path,YAML.stringify(JSON.parse(data)));

                            break;
                        }
                        case 'Spices' : {

                            const { data } = request;

                            console.log('Data',data);

                            const json = JSON.parse(data);

                            await saveSpices(json);

                            break;
                        }
                    }


                    // socket.close();
                    return;
                }
                default:
                    console.log(`Unkown request type :`,action);
                    // socket.close();
                }

            } catch (error) {
                console.log(error);
                socket.close();
            }
        };


        exchange.respondWith(response);
    }
}
