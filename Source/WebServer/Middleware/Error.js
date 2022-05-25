


async function handle(context,next){
    try { await next(); } catch (error) {
        console.error(error);
        context.throw(404);
    }
}


export default handle;
