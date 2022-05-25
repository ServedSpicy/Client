
import { Router } from 'Oak';
import Routes from 'Routes';


const router = new Router;

for(const [ route , handler ] of Routes)
    router.get(route,handler);

export default router.routes();
