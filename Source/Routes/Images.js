
import { middleware , notImage } from './Routing.js';
import { img } from 'Resources';


const handler = middleware({
    pathPadding : 5 ,
    wrongPath : notImage ,
    mimeType : 'image/png' ,
    folder : img
});


export default handler;
