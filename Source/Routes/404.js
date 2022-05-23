
import { Status } from 'Oak';


const { NOTFOUND } = Status;


export default async ({ response }) =>
    response.status = NOTFOUND;
