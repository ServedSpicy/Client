
import { webview as print , orangeA } from 'Log';
import { Webview } from 'WebView';




print('Worker Running');


self.onmessage = async ({ data : { port } }) => {

    const address = `http://localhost:${ port }`;

    print(`Connecting To %c${ address }`,orangeA);

    const webview = new Webview();
    webview.navigate(address);
    webview.title = 'ServedSpicy';
    webview.run();

    print('Stopping Worker Thread');

    self.close();
}
