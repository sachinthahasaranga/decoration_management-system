const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const decoAppoiment = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        store: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        selection: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const decoAppoiment_Schema = mongoose.model(
    "decoAppoiment",
    decoAppoiment
);
module.exports = decoAppoiment_Schema;
