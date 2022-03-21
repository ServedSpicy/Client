
import { js } from 'Resources';
import { Status } from 'Oak';


async function handle(context){

    const { request , response } = context;
    const { pathname } = request.url;

    if(!/^\/js\/[a-zA-Z0-9_%.-]+\.js$/i.test(pathname))
        return context.throw(404);

    response.status = Status.OK;
    response.type = 'text/javascript';

    const path = pathname
        .slice(4)
        .replaceAll('%20',' ');

    await context.send({
        root : js,
        path : path
    });
}


export default handle;
