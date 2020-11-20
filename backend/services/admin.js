const serve = require('koa-static');
const Koa = require('koa');

const AdminRegion = new Koa();
AdminRegion.use(serve('./public/admin'));
module.exports = { AdminRegion };