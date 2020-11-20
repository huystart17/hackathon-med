const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const table = "crawl_places_ho_chi_minh";

const Schema = new mongoose.Schema(
    {
        "gps": {type: mongoose.Schema.Types.Mixed},
        "hash": {type: String, required: true, unique: true},
        "title":{type: String,},
        "address": {type: String,},
        "category":{type: String,},
        crawl_status: {type: String} , //crawled  || failed

    },
    {
        strict: false,
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);
Schema.plugin(mongoosePaginate);
let CrawlPlaceDetailModel = mongoose.model(table, Schema);

module.exports = CrawlPlaceDetailModel;
