
import { index } from 'Resources';
import { join } from 'Path';
import { Status } from 'Oak';


const page = { root : index };


export default async (context) => {

    const { response } = context;

    response.status = Status.OK;
    response.type = 'text/html';

    await context.send(page);
}
