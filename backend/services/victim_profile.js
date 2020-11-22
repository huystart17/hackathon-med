const Koa = require('koa');

const Router = require('@koa/router');
const { TagModel } = require('../db/models');
const { getServiceObject } = require('../lib/rest_full_service');

const serviceObject = getServiceObject({ Model: TagModel });

const TagRestService = new Koa();

const router = new Router({});

router.get('/', serviceObject.find);
router.get('/:id', serviceObject.get);
router.post('/', serviceObject.create);
router.put('/:id', serviceObject.update);
router.del('/:id', serviceObject.delete);

TagRestService.use(router.routes()).use(router.allowedMethods());

module.exports = { TagRestService };
