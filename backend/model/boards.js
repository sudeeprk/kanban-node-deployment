const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema({
    id: {
        type:Number
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    due: Number,
    });

    const boardModel = mongoose.model("boards", boardSchema);
    module.exports = boardModel;