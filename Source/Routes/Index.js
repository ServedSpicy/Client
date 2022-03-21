
import { index } from 'Resources';
import { join } from 'Path';
import { Status } from 'Oak';


export default async (context) => {

    const { response } = context;

    response.status = Status.OK;
    response.type = 'text/html';

    console.log(index);

    await context.send({ root : index });
}
