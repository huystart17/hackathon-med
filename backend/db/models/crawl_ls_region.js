const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const table = 'crawl_ls_region_ho_chi_minh';

const Schema = new mongoose.Schema(
    {
        point1: {type: mongoose.Schema.Types.Mixed, required: true},
        point2: {type: mongoose.Schema.Types.Mixed, required: true},
        status: {type: Number, default: 1,},
        places: {type: mongoose.Schema.Types.Mixed},
        position_key: {type: String, required: true, unique: true},
        region_label: {type: String},
        crawl_status: {type: String},
        crawl_param : {type : mongoose.Schema.Types.Mixed },
        crawl_url : {type : String }

    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);
Schema.plugin(mongoosePaginate);
let CrawlPlaceModel = mongoose.model(table, Schema);

module.exports = CrawlPlaceModel;
