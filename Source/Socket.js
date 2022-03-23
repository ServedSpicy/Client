
import * as YAML from 'YAML';
import { socketPort } from 'Parameters';

import upload from './Upload.js';


export async function init(){

    console.log('initing')


    const { listen } = Deno;

    for await(const connection of listen({ port : socketPort })){

        const http = Deno.serveHttp(connection);
        const exchange = await http.nextRequest();

        if(exchange){

            const { socket , response } = Deno.upgradeWebSocket(exchange.request);

            socket.onopen = () =>
                socket.send("Hello World!");

            socket.onmessage = async (message) => {

                const { data } = message;

                try {

                    const request = JSON.parse(data);

                    console.log(request);

                    const { action } = request;

                    switch(action){
                    case 'upload' : {

                        upload();

                        socket.close();
                        return;
                    }
                    case 'read': {

                        const { resource } = request;

                        console.log(`Requsting resource : `,resource);

                        switch(resource){
                        case 'Recipes':
                        case 'Spices':

                            let path = `${ Deno.env.get("HOME") }/.config/ServedSpicy/${ resource }.yaml`;
                            console.log(path);
                            path = await Deno.realPath(path);
                            console.log(path);

                            const text = await Deno.readTextFile(path);
                            const data = YAML.parse(text);
                            console.log(data);
                            socket.send(JSON.stringify({ resource , data }));
                            break;
                        }

                        socket.close();
                        return;
                    }
                    case 'write': {

                        const { resource } = request;

                        console.log(`Saving Resource :`,resource);

                        switch(resource){
                        case 'Recipes':
                        case 'Spices':

                            const { data } = request;

                            console.log('Data',data);

                            let path = `${ Deno.env.get("HOME") }/.config/ServedSpicy/${ resource }.yaml`;
                            console.log(path);

                            await Deno.writeTextFile(path,YAML.stringify(JSON.parse(data)));

                            break;
                        }


                        socket.close();
                        return;
                    }
                    default:
                        console.log(`Unkown request type :`,action);
                        socket.close();
                    }

                } catch (error) {
                    console.log(error);
                    socket.close();
                }
            };

            socket.onclose = () =>
                console.log(`WebSocket has been closed.`);

            socket.onerror = (error) =>
                console.error(`WebSocket Error : `,exchange,error);

            exchange.respondWith(response);
        }
    }
}
