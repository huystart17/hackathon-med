const is = require('is_js');

function middleware_auth_user({ redirect = false, allow_type = [] }) {
    return async function authUser(ctx, next) {
        let user = ctx.session.user;
        let is_not_allow = false;
        if (!user) {
            if (!ctx.path.match(/auth\/.+/)) {
                is_not_allow = true;
            }
        }
        if (
            is.not.empty(allow_type) &&
            allow_type.every((item) => item.type !== user.type)
        ) {
            is_not_allow = true;
        }
        if (is_not_allow) {
            ctx.status = 403;
            ctx.body = { msg: 'You are not allow to access this url' };
            if (redirect) ctx.redirect('/auth/login.html');
            return false;
        }
        await next();
    };
}

module.exports = { middleware_auth_user };
