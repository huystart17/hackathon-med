const serve = require('koa-static');
const Koa = require('koa');
const { config } = require('../config');
const PublicAssets = new Koa();
PublicAssets.use(serve('./public'));

const DistAssets = new Koa();
DistAssets.use(serve('./dist'));


const OptAssests = new Koa();
OptAssests.use(serve('/opt/sre'));

module.exports = { DistAssets, PublicAssets, OptAssests };