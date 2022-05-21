
import Javascript from '../Routes/Javascript.js';
import Shutdown   from '../Routes/Shutdown.js';
import NotFound   from '../Routes/404.js';
import Images     from '../Routes/Images.js';
import Index      from '../Routes/Index.js';
import Style      from '../Routes/Style.js';

export default [
    [ '/css/Themes/:theme'  , Style      ] ,
    [ '/favicon.ico'        , NotFound   ] ,
    [ '/css/:css'           , Style      ] ,
    [ '/img/:img'           , Images     ] ,
    [ '/js/:js'             , Javascript ] ,
    [ '/js/Data/:js'        , Javascript ] ,
    [ '/Shutdown'           , Shutdown   ] ,
    [ '/'                   , Index      ] ,
];
