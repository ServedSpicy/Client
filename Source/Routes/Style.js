import { css } from 'Resources';
import { Status } from 'Oak';


async function handle(context){

    const { request , response } = context;
    const { pathname } = request.url;

    if(!/^\/css\/[a-zA-Z0-9_%./-]+\.css$/i.test(pathname))
        return context.throw(404);

    response.status = Status.OK;
    response.type = 'text/css';

    const path = pathname
        .slice(5)
        .replaceAll('%20',' ');

    await context.send({
        root : css,
        path : path
    });
}


export default handle;
