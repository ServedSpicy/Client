
import { middleware , notAudio } from './Routing.js';
import { audio } from 'Resources';


const handler = middleware({
    pathPadding : 7 ,
    wrongPath : notAudio ,
    mimeType : 'audio/wav' ,
    folder : audio
});


export default handler;
