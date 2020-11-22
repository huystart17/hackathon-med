const ApiSuccessHandler = {
    sendJson(ctx, message = '', data = {}) {
        ctx.status = 200;
        ctx.body = {
            message,
            data,
        };
    },
};
module.exports = { ApiSuccessHandler };
