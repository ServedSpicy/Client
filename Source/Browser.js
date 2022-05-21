
import { Webview } from 'https://raw.githubusercontent.com/webview/webview_deno/main/src/webview.ts';

const { log } = console;

log('Browser waiting for port');

self.onmessage = async ({ data : { port } }) => {

    log(`Opening browser with port: ${ port }`);

    const webview = new Webview();
    webview.navigate(`http://localhost:${ port }`);
    webview.run();

    log('Closing browser worker');

    self.close();
}