
import { Webview } from 'WebView';

const { log } = console;

log('Browser waiting for port');

self.onmessage = async ({ data : { port } }) => {

    log(`Opening browser with port: ${ port }`);

    const webview = new Webview();
    webview.navigate(`http://localhost:${ port }`);
    webview.title = 'ServedSpicy';
    webview.run();

    log('Closing browser worker');

    self.close();
}
