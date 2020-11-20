const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const table = 'app_account';

const Schema = new mongoose.Schema(
    {
        type: { type: String, default: 'guess' },
        account: { type: String, unique: true, index: true },
        email: { type: String, unique: true },
        phone: { type: String, unique: true },
        status: { type: Number, default: 1 }, //1 : active, 0 :deleted
        password: { type: String, select: false }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);
Schema.plugin(mongoosePaginate);
let AccountModel = mongoose.model(table, Schema);

module.exports =  AccountModel;
