
import { cyanA , blueA , reset , orangeA } from 'Color'


const { log } = console;


export function general(text,...style){
    log(`  %c🭬 %c${ text }`,'color:gray',reset, ...style );
}

export function webserver(text,...style){
    log(` 📦  ${ text }`, ...style );
}

export function websocket(text,...style){
    log(` 📬  ${ text }`, ...style );
}

export function webview(text,...style){
    log(` 📺  ${ text }`, ...style );
}

export function serial(text,...style){
    log(` 🔗  ${ text }`, ...style );
}

export * from 'Color';

export function prettifyPath(path,options){

    const parts = path
        .split('/')
        .filter((part) => part);

    const { lineLimit } = options;

    let lines = [];
    let line = [];

    for(const part of parts)
        if((line + ' / ' + part).length > lineLimit){
            lines.push(line.join(' / '));
            line = [ part ];
        } else {
            line.push(part);
        }

    if(line.length)
        lines.push(line.join(' / '));

    const { padLine } = options;

    if(padLine){

        const padding = ' '.repeat(padLine);

        let [ first , ...other ] = lines;

        other = other.map((line) => padding + line);

        return [ first , ...other ].join('\n') + '\n';
    }

    return lines;
}
