const ApiSuccessHandler = {
    sendJson(ctx, msg = '', data = {}) {
        ctx.status = 200;
        ctx.body = {
            msg, data
        };

    }
};
module.exports = { ApiSuccessHandler };