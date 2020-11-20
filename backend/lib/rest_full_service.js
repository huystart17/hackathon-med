const is = require("is_js");
const URL = require("url");
const { ApiSuccessHandler } = require("./handler");
const { MyError } = require("./error");
const getServiceObject = ({ Model, options }) => {
  return {
    async find(ctx, next) {
      let { request } = ctx;
      let { query } = request;
      let { limit = 10, page = 1, sort = { _id: -1 }, filter = {} } = query;
      let queryDb = {
        ...filter,
        status: 1,
      };
      limit = Number(limit);
      page = Number(page);
      if (is.not.integer(limit)) {
        throw MyError.NotValidate("limit phải có giá trị là một số tự nhiên");
      }
      if (is.not.integer(page)) {
        throw MyError.NotValidate("page phải có giá trị là một số tự nhiên");
      }
      let queryResult = await Model.paginate(queryDb, { limit, page, sort });
      let items = queryResult.docs;
      let total = queryResult.totalDocs;
      let totalPages = queryResult.totalPages;
      let hasNextPage = queryResult.hasNextPage;
      let hasPrevPage = queryResult.hasPrevPage;

      let nextPageUrl = null;
      let prevPageUrl = null;
      if (hasNextPage) {
        nextPageUrl = new URL.URL(request.href);
        nextPageUrl.searchParams.set("page", queryResult.nextPage);
      }
      if (hasPrevPage) {
        prevPageUrl = new URL.URL(request.href);
        prevPageUrl.searchParams.set("page", queryResult.prevPage);
      }

      let noPageUrl = new URL.URL(request.href);
      noPageUrl.searchParams.delete("page");

      ApiSuccessHandler.sendJson(ctx, "Lấy danh sách bản ghi thành công", {
        items,
        limit,
        page,
        sort,
        total,
        hasNextPage,
        hasPrevPage,
        totalPages,
        nextPageUrl,
        noPageUrl,
        prevPageUrl,
        filter,
      });
      return await next();
    },
    async get(ctx, next) {
      let { id } = ctx.params;
      if (!id) throw MyError.NotValidate("Thiếu id");
      let record = await Model.findById(id);
      if (!record) throw MyError.NotFound("Không tìm thấy bản ghi");
      record = record.toJSON();
      ApiSuccessHandler.sendJson(ctx, "Lấy bản ghi thành công", { record });
      return await next();
    },
    async update(ctx, next) {
      let { id } = ctx.params;
      let { body = {} } = ctx.request;
      let { record } = body;

      if (!id) throw MyError.NotValidate("Thiếu id");
      if (is.empty(record))
        MyError.NotValidate(`'body.record' không nên bị rỗng`);
      let recordInDb = await Model.findById(id);
      if (!recordInDb) throw MyError.NotFound("Không tìm thấy bản ghi");

      let recordAfterUpdate = await Model.findByIdAndUpdate(id, record, {
        new: true,
      });
      recordAfterUpdate = recordAfterUpdate.toJSON();
      ApiSuccessHandler.sendJson(ctx, "Lấy bản ghi thành công", {
        record: recordAfterUpdate,
      });
      return await next();
    },
    async delete(ctx, next) {
      let { id } = ctx.params;
      if (!id) throw MyError.NotValidate("Thiếu id");
      let record = await Model.findById(id);
      if (!record) throw MyError.NotFound("Không tìm thấy bản ghi");
      record = record.toJSON();
      record = await Model.findByIdAndUpdate(id, { status: 0 }, { new: true });
      ApiSuccessHandler.sendJson(ctx, "Xoá bản ghi thành công", { record });
      return await next();
    },
    async create(ctx, next) {
      let { request } = ctx;
      let { query } = request;
      let { body = {} } = request;
      let { record = {} } = body;
      let recordInDb;

      if (is.empty(record))
        throw MyError.NotValidate(`"record" trong body không được rỗng`);
      try {
        recordInDb = await Model.create(record);
      } catch (err) {
        throw MyError.NotValidate(err.msg);
      }
      ApiSuccessHandler.sendJson(ctx, "Thêm bản ghi thành công", {
        record: recordInDb.toJSON(),
      });
      return await next();
    },
  };
};

module.exports = { getServiceObject };
