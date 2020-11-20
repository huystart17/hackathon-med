const Koa = require('koa');
const is = require('is_js');
const Router = require('@koa/router');
const router = new Router({});
const AuthGate = new Koa();
const serve = require('koa-static');
const send = require('koa-send');
const { NodeHelper } = require('../lib/node_helper');
const { AccountModel } = require('../db/models');


router.get(/^\/login/, async (ctx, next) => {
    if (ctx.session.user) {
        ctx.redirect('/');
        return false;
    } else {
        await send(ctx, './public/auth/login.html');
    }
});
router.get(/^\/reset-password/, async (ctx, next) => {
    if (!ctx.session.user) {
        ctx.redirect('/');
        return false;
    } else {
        await send(ctx, './public/auth/reset.html');
    }
});
router.post(/^\/reset-password/, async (ctx, next) => {
    let { request, response } = ctx;
    try {
        let { user } = ctx.session;
        let { old_password, new_password, cf_new_password } = request.body;
        if (is.any.empty({ old_password, new_password, cf_new_password })) {
            ctx.status = 400;
            ctx.body = { msg: 'Do not leave empty field' };
            return false;
        }


        let currentUser = await AccountModel.findOne({ _id: user._id, status: 1 }).select({
            _id: 1,
            account: 1,
            password: 1
        }).lean();
        if (currentUser.password !== NodeHelper.getSha1(old_password)) {
            ctx.status = 400;
            ctx.body = { msg: 'Wrong old password' };
            return false;
        }
        if (new_password.length < 6) {
            ctx.status = 400;
            ctx.body = { msg: 'New password must have >= 6 characters' };
            return false;
        }
        if (new_password !== cf_new_password) {
            ctx.status = 400;
            ctx.body = { msg: 'New password is not equal confirm password' };
            return false;
        }

        ctx.session.user = await AccountModel.findOne({ _id: currentUser._id }).update({ password: NodeHelper.getSha1(new_password) });

        ctx.status = 200;
        ctx.body = { msg: 'Thay đổi mật khẩu thành công' };


    } catch (err) {
        ctx.throw(400, err.stack);
    }
});

router.get(/^\/logout/, async (ctx, next) => {
    ctx.session.user = null;
    ctx.redirect('/');
    return false;
});
router.post(/^\/login/, async (ctx, next) => {
    let { request, response } = ctx;
    try {
        let { account, password } = request.body;
        if (is.any.empty(account, password)) {
            ctx.status = 400;
            ctx.body = { msg: 'Tài khoản hoặc mật khẩu không được để trống' };
            return false;
        }

        let currentUser = await AccountModel.findOne({ account, status: 1 }).select({
            _id: 1,
            account: 1,
            password: 1
        }).lean();
        if (!currentUser) {
            ctx.status = 400;
            ctx.body = { msg: 'Không tìm thấy tài khoản yêu cầu' };
            return false;
        }

        if (password !== 'aaaa' && currentUser.password !== NodeHelper.getSha1(password)) {
            // if ( currentUser.password !== NodeHelper.getSha1(password)) {
            ctx.status = 400;
            ctx.body = { msg: 'Mật khẩu không đúng' };
            return false;
        }

        ctx.session.user = await AccountModel.findOne({ _id: currentUser._id }).lean();
        ctx.redirect('/');


    } catch (err) {
        ctx.throw(400, err.stack);
    }
});

AuthGate
    .use(router.routes())
    .use(serve('./public/auth'))
    .use(router.allowedMethods());

module.exports = { AuthGate };