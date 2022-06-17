
import Javascript from './Javascript.js';
import NotFound   from './404.js';
import Images     from './Images.js';
import Audio      from './Audio.js';
import Index      from './Index.js';
import Style      from './Style.js';

export default [
    [ '/css/Themes/:theme'  , Style      ] ,
    [ '/favicon.ico'        , NotFound   ] ,
    [ '/css/:css'           , Style      ] ,
    [ '/audio/:wav'         , Audio      ] ,
    [ '/img/:img'           , Images     ] ,
    [ '/js/:js'             , Javascript ] ,
    [ '/js/Data/:js'        , Javascript ] ,
    [ '/'                   , Index      ] ,
];
