const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const table = 'app_tag';
const Schema = new mongoose.Schema({
    text: {type: String, required: true},
    status: {type: Number, default: 1}

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
Schema.plugin(mongoosePaginate);
Schema.options.toJSON = {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};
let TagModel = mongoose.model(table, Schema);

module.exports = TagModel;