const session = require('koa-session');
const bodyParser = require('koa-bodyparser');

const middleware_session = (app, options = {}) => {

    const CONFIG = {
        key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 86400000,
        autoCommit: true,
        /** (boolean) automatically commit headers (default true) */
        overwrite: true,
        /** (boolean) can overwrite or not (default true) */
        httpOnly: true,
        /** (boolean) httpOnly or not (default true) */
        signed: true,
        /** (boolean) signed or not (default true) */
        rolling: false,
        /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
        renew: false,
        /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
        secure: false,
        /** (boolean) secure cookie*/
        sameSite: null /** (string) session cookie sameSite options (default null, don't set it) */
    };
    return session(CONFIG, app);

};

const middleware_cors = () => {

};

const middleware_body_parser = (options = {}) => {
    return bodyParser(options);
};

const middleware_set_response_header = (option = {}) => {

    return async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
    };
};

const middleware_end_service = () => {
    return async (ctx, next) => {
        return true;
    };
};
module.exports = {middleware_session, middleware_body_parser, middleware_set_response_header, middleware_end_service};