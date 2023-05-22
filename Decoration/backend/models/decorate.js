const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const decorate = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        store: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
        },
        descrip: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
        },  
        category: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const decorate_Schema = mongoose.model(
    "decorate",
    decorate
);
module.exports = decorate_Schema;
