
import { Status } from 'Oak';


export default async (context) => {

    const { response } = context;

    response.status = Status.NOTFOUND;
}
