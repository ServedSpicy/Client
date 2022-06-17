
import { Status } from 'Oak';


const
    regex_javascript = /^\/js(\/[a-zA-Z0-9_%.-]+)+\.js$/i,
    regex_audio = /^\/audio\/[a-zA-Z0-9_%./-]+\.wav/i,
    regex_style = /^\/css\/[a-zA-Z0-9_%./-]+\.css$/i,
    regex_image = /^\/img\/[a-zA-Z0-9_%.-]+\.png$/i;


export function middleware(options){

    const { mimeType , wrongPath , pathPadding , folder } = options;

    function toFile(path){
        return { root : folder , path };
    }

    return async (context) => {

        const { request , response } = context;
        const { pathname } = request.url;

        if(wrongPath(pathname))
            return context.throw(404);

        response.status = Status.OK;
        response.type = mimeType;

        const path = toFilePath(pathname,pathPadding);
        await context.send(toFile(path));
    }
}


export function toFilePath(pathname,padding = 5){
    return pathname
        .slice(padding)
        .replaceAll('%20',' ');
}


export function notJavascript(pathname){
    return ! regex_javascript.test(pathname);
}

export function notImage(pathname){
    return ! regex_image.test(pathname);
}

export function notStyle(pathname){
    return ! regex_style.test(pathname);
}

export function notAudio(pathname){
    return ! regex_audio.test(pathname);
}
