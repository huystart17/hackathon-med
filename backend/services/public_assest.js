const serve = require('koa-static');
const Koa = require('koa');
const { config } = require('../config');
const PublicAssets = new Koa();
PublicAssets.use(serve('./public'));

const DistAssets = new Koa();
DistAssets.use(serve('./dist'));


const DataAssets = new Koa();
DataAssets.use(serve('./data'));

module.exports = { DistAssets, PublicAssets, DataAssets };