
import * as WebServer from './WebServer/WebServer.js';
import * as WebSocket from './WebSocket/Socket.js';
import * as WebView from './WebView/WebView.js';


await Promise.any([
    WebSocket.listen(),
    WebServer.listen(),
    WebView.start()
]);
