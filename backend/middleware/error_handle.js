const middleware_handle_404 = (options = {}) => {
    return async (ctx) => {
        ctx.status = 404;
        ctx.body = { message: '404 Not found' };
    };
};

const middleware_handle_generic_error = (options = {}) => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = { code: err.code || err.status, msg: err.msg ,data: err.data };
            if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {

                console.error(err);
                // ctx.app.emit('error', err, ctx);
            } else if (process.env.NODE_ENV === 'production') {
                console.error(err);
            }
        }
    };
};


module.exports = { middleware_handle_404, middleware_handle_generic_error };