
import { middleware , notJavascript } from './Routing.js';
import { js } from 'Resources';


const handler = middleware({
    pathPadding : 4 ,
    wrongPath : notJavascript ,
    mimeType : 'text/javascript' ,
    folder : js
});


export default handler;
