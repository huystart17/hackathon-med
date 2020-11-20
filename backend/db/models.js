const conn = require("./mongo_connection");
const mongoose = require("mongoose");
const TagModel = require("./models/tag");
const AccountModel = require("./models/account");
const CrawlPlaceModel = require("./models/crawl_ls_region");
const CrawlPlaceDetailModel = require("./models/crawl_places");
const CrawlQuestionModel = require("./models/crawl_question");

module.exports = {
  TagModel,
  AccountModel,
  CrawlPlaceModel,
  CrawlPlaceDetailModel,
  CrawlQuestionModel,
};
