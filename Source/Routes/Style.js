
import { middleware , notStyle } from './Routing.js';
import { css } from 'Resources';


const handler = middleware({
    pathPadding : 5 ,
    wrongPath : notStyle ,
    mimeType : 'text/css' ,
    folder : css
});


export default handler;
