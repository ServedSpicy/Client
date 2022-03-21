import { img } from 'Resources';
import { Status } from 'Oak';


async function handle(context){

    const { request , response } = context;
    const { pathname } = request.url;

    if(!/^\/img\/[a-zA-Z0-9_%.-]+\.png$/i.test(pathname))
        return context.throw(404);

    response.status = Status.OK;
    response.type = 'image/png';

    const path = pathname
        .slice(5)
        .replaceAll('%20',' ');

    await context.send({
        root : img,
        path : path
    });
}


export default handle;
